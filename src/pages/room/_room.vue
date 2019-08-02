<template>
  <div class="container" style="flex-direction: column;">
    {{ room }}
    <input v-model="selectedRoom"><button @click="$router.push(selectedRoom)">Go</button>
    <div ref="container" style="flex: 1; width: 100%">&nbsp;</div>
  </div>
</template>

<script>

import GameRenderer from '@screeps/renderer'

import worldConfigs from '@/assets/worldConfigs'
import { resourceMap, rescaleResources } from '@/assets/resourceMap'

const rendererSym = Symbol.for("renderer")

let first = true

class Renderer {
  constructor ({ api, room, container }) {
    this.api = api
    this.room = room
    this.objects = {}
    this.users = {}
    this.gameTime = 0
    this.view = container
    this.state = {
      users: this.users,
      gameTime: this.gameTime,
    }
    this.initRenderer ()
    window.r = this
  }

  destroy() {
    if (this.renderer) {
      this.renderer.erase()
      this.renderer.release()
      this.api.socket.unsubscribe(`room:${this.room}`)
      this.api.socket.off('message', this.boundFN)
    }
  }

  async initRenderer () {
    const say = worldConfigs.metadata.objects.creep.processors.find(p => p.type === 'say')
    say.when = ({ state: { actionLog: { say } = {} } }) => !!say && say.isPublic
    if (first) {
      GameRenderer.compileMetadata(worldConfigs.metadata)
      first = false
    }
    worldConfigs.BADGE_URL = `${this.api.opts.url}api/user/badge-svg?username=%1`
    this.renderer = new GameRenderer({
      size: {
        width: this.view.offsetWidth,
        height: this.view.offsetHeight
      },
      // autoFocus: false,
      resourceMap,
      rescaleResources,
      worldConfigs,
      onGameLoop: () => {},
      countMetrics: false,
      // fitToWorld: {
      //   width: 50,
      //   height: 50
      // },
      useDefaultLogger: true, //true,
      backgroundColor: 0x000000
      // backgroundColor: 0x505050
    })
    await this.renderer.init(this.view)
    this.renderer.resize()
    this.renderer.zoomLevel = 0.19 //view.offsetHeight / 5000
    if (!this.api.socket.connected) {
      await this.api.socket.connect()
    }
    let { terrain: [{ terrain: encoded } = {}] = [] } = await this.api.raw.game.roomTerrain(this.room, true)
    const types = ['plain', 'wall', 'swamp', 'wall']
    const terrain = encoded.split('').filter(t => t).map((v, i) => ({
      x: i % 50,
      y: Math.floor(i / 50),
      type: types[v]
    }))
    this.renderer.setTerrain(terrain)
    await this.renderer.erase()
    await this.renderer.applyState(Object.assign({ objects: [] }, this.state))
    worldConfigs.gameData.player = await this.api.userID()
    this.boundFN = this.handleSocketMessage.bind(this)
    this.api.socket.on('message', this.boundFN)
    await this.api.socket.subscribe(`room:${this.room}`)
  }
  async handleSocketMessage ({ type, channel, id, data, data: { gameTime=0, info, objects, users = {}, visual } = {} }) {
    const { state, renderer, api, room } = this
    if (type !== 'room') return
    if (id !== room) return await api.socket.unsubscribe(`room:${id}`)
    let { tick: tickSpeed = 1 } = await api.req('GET', '/api/game/tick')
    for (const k in users) {
      state.users[k] = users[k]
    }
    const cachedObjects = this.objects
    for (const [id, diff] of Object.entries(objects)) {
      const cobj = cachedObjects[id] = cachedObjects[id] || {}
      if (diff === null) {
        delete cachedObjects[id]
      } else {
        cachedObjects[id] = Object.assign({}, cobj, diff)
      }
    }
    state.gameTime = gameTime || state.gameTime || 1
    console.log('objects', cachedObjects)
    try {
      const objects = Array.from(Object.values(cachedObjects))
      const ns = Object.assign({ objects }, state)
      await renderer.applyState(ns, tickSpeed / 1000)
    }catch(e) {
      console.error('Error in update', e)
      await api.socket.unsubscribe(`room:${room}`)
      await sleep(100)
    }
  }
}

export default {
  async asyncData ({ app: { $api }, params: { room } }) {
    if (room === 'auto') {
      const { room: [newRoom] } = await $api.raw.user.worldStartRoom()
      room = newRoom || 'E0N0'
    }
    return { room, selectedRoom: room }
  },
  data () {
    return { 
      room: '',
      selectedRoom: ''
    }
  },
  mounted () {
    console.log('mounted')
    this[rendererSym] = new Renderer({ api: this.$api, room: this.room, container: this.$refs.container })
  },
  beforeDestroy () {
    console.log('beforeDestroy')
    this[rendererSym].destroy()
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>