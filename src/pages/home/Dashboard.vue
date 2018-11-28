<template>
  <div class="home-index">
    <swiper @on-index-change="onFocusIndexChange" v-model="focusIndex">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in focusData" :key="index">
        <img :src="item.img">
      </swiper-item>
    </swiper>
    <group gutter="0">
      <cell>
        <span slot="title" class="notice-title">
          {{$t('components.home.notice')}}
          <i class="iconfont icon-gonggao"></i>
        </span>
        <marquee>
          <marquee-item v-for="(notice, key) in notices" :key="key">{{ notice.title}}</marquee-item>
        </marquee>
      </cell>
    </group>

    <group>
      <selector 
        title="账号" 
        v-model="accountSelect"
        placeholder = "请选择账号"
        @on-change = "selectAccount"
        :options="accounts"></selector>
       <cell title="值" :value="testValue"></cell>
    </group>

    <group>
      <div class="lsiten-button-cell">
        <x-button type="primary" @click.native="addTestValue">加1</x-button>
      </div>
      <div class="lsiten-button-cell">
        <x-button type="primary" @click.native="getTestValue">获取值</x-button>
      </div>
    </group>
  </div>
</template>

<script>
import { Radio, Group, Swiper, SwiperItem, Cell, Selector, XButton, Marquee, MarqueeItem } from 'vux'
import { mapGetters } from 'vuex'
import Lsiten from '../../../build/contracts/Lsiten.json'

const baseList = [{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg',
  title: '送你一次旅行'
}]
export default {
  name: 'home-index',
  components: {
    Radio,
    Group,
    SwiperItem,
    Swiper,
    Marquee,
    MarqueeItem,
    Cell,
    XButton,
    Selector
  },
  data () {
    return {
      focusData: baseList,
      focusIndex: 0,
      notices: [
        {
          title: '测试1'
        },
        {
          title: '测试2'
        },
        {
          title: '测试3'
        }
      ],
      accounts: [],
      accountSelect: '',
      currentContract: null,
      testValue: ''
    }
  },
  computed: {
    ...mapGetters({
      web3: 'web3_get_instance'
    })
  },
  created () {
    this.$vux.bus && this.$vux.bus.$on('vux:after-view-enter', this.init)
    this.web3Instance = this.web3()
    this.web3Instance.eth.getAccounts().then(accounts => {
      this.accounts = accounts
    })
  },
  destroyed () {
    this.$vux.bus && this.$vux.bus.$off('vux:after-view-enter', this.init)
  },
  methods: {
    init () {
      console.log(1)
    },
    onFocusIndexChange: function (lang) {
    },
    selectAccount (val) {
      // const abi = Lsiten.abi
      this.currentContract = new this.web3Instance.eth.Contract(Lsiten.abi, val)
    },
    addTestValue () {
      if (!this.currentContract || !this.accountSelect) {
        this.$vux.toast.text('请选择账号！', 'middle')
        return
      }
      this.$store.dispatch('com_set_loading_status', true)
      this.currentContract.methods.addTestId().send({
        from: this.currentContract.options.address
      })
      .then(result => {
        this.$store.dispatch('com_set_loading_status', false)
        if (result.status) {
          // 显示文字
          this.$vux.toast.text('操作成功！', 'middle')
        } else {
          this.$vux.toast.text('操作失败！', 'middle')
        }
      })
      .catch(resultErr => {
        this.$store.dispatch('com_set_loading_status', false)
        this.$vux.toast.text('操作失败！', 'middle')
      })
    },
    getTestValue () {
      if (!this.currentContract || !this.accountSelect) {
        this.$vux.toast.text('请选择账号！', 'middle')
        return
      }
      this.$store.dispatch('com_set_loading_status', true)
      this.currentContract.methods.lsitenGetTestId().call({
        from: this.currentContract.options.address
      })
      .then((result) => {
        this.$store.dispatch('com_set_loading_status', false)
        this.testValue = result[0] || result
      }).catch(resultErr => {
        console.log(resultErr)
        this.$store.dispatch('com_set_loading_status', false)
        this.$vux.toast.text('操作失败！', 'middle')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.lsiten-button-cell {
  padding: 5px 10px;
}
.swiper-demo-img img {
  width: 100%;
}
.notice-title {
  color: #9f0000;
}
.weui-cells {
  margin-top: 0;
}
</style>

