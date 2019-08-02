<template>
  <div class="container">
    <div>
      <logo />
      <div class="server-list">
        <button v-for="server of servers" :key="server._id" @click="connect(server)">
          {{ server.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import sortBy from 'lodash/sortBy'
export default {
  async asyncData ({ $axios }) {
    const { data: { servers } } = await $axios.post('https://screeps.com/api/servers/list')

    servers.push({
      name: 'S+ PR Test',
      settings: {
        host: 'prtest.screepspl.us'
      }
    })

    servers.push({
      name: 'S+ Test',
      settings: {
        host: 'test.screepspl.us'
      }
    })

    return { servers: sortBy(servers, s => s.name.toLowerCase()) }
  },
  data () {
    return {
      origin: location.origin
    }
  },
  components: {
    Logo
  },
    
  mounted () {
    window.addEventListener('message', this.handleMessage)
  },
  destroyed () {
    window.removeEventListener('message', this.handleMessage)
  },
  methods: {
    async connect ({ settings: { host, pass, port } }) {
      this.$api.setServer({
        hostname: host,
        port
      })
      let server = `http://${host}:${port}`
      if (host.includes('screepspl.us')) {
        server = `https://${host}`
        this.$api.setServer({
          hostname: host,
          port: 443,
          protocol: 'https'
        })
      }
      this.origin = server
      window.open(`${server}/api/auth/steam`)
    },
    async handleMessage (e) {
      console.log(e)
      if (e.origin === this.origin && e.data[0] === '{') {
        const { token } = JSON.parse(e.data)
        if (token) {
          this.$api.token = token
          await this.$api.me()
          this.$router.push(`room/auto`)
        } else {
          alert('Auth Failed')
        }
      }
    }
  }
}
</script>

<style>

.server-list {
  display: flex;
  flex-direction: column;
}

.server-list button {
  height: 32px;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
