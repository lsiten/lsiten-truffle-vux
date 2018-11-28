<template>
  <div class='lsiten-footer'>
    <tabbar class="vux-demo-tabbar" icon-class="vux-center" v-show="isShowBar">
      <tabbar-item :link="{path:'/'}" :selected="route.path === '/dashboard' || route.path === '/'" >
        <span class="iconfont icon-yemian" slot="icon" style="position:relative;top: -2px;"></span>
        <span class="iconfont icon-yemian-selected" slot="icon-active" style="position:relative;top: -2px;"></span>
        <span slot="label">{{home}}</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/order'}" :selected="route.path === '/order'">
        <span class="iconfont icon-order" slot="icon" style="position:relative;top: -2px;"></span>
        <span class="iconfont icon-order-selected" slot="icon-active" style="position:relative;top: -2px;"></span>
        <span slot="label">{{order}}</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/user'}" :selected="route.path === '/user'">
        <span class="iconfont icon-gerenzhongxin-xuanzhong"  slot="icon" style="position:relative;top: -2px;"></span>
        <span class="iconfont icon-gerenzhongxin-xuanzhong-select" slot="icon-active" style="position:relative;top: -2px;"></span>
        <span slot="label">{{user}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'lsiten-footer',
  data () {
    return {
      home: '',
      order: '',
      user: ''
    }
  },
  watch: {
    locale: function (nval, oval) {
      this.initBarLabel()
    }
  },
  created () {
    this.initBarLabel()
  },
  components: {
    Tabbar,
    TabbarItem
  },
  methods: {
    initBarLabel () {
      this.home = this.$t('components.footer.home')
      this.order = this.$t('components.footer.order')
      this.user = this.$t('components.footer.user')
    }
  },
  computed: {
    ...mapGetters({
      isShowBar: 'com_bar_isshow',
      locale: 'com_sys_locale'
    }),
    ...mapState({
      route: state => state.route
    })
  }
}
</script>
<style lang="less" scoped>
  .vux-demo-tabbar {
    .iconfont {
      font-size: 22px;
    }
  }
</style>

