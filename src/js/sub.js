/* eslint-disable no-unused-vars */

import gsap from 'gsap'
import * as Vue from 'vue/dist/vue.min'
// import Vue from 'vue/dist/vue'

export function scrollFunction () {
  var vm = new Vue({
    el: '.l_contents',
    data: {
      gNaviFlag: false,
      gNaviLoadingFlag: true,
      scrPos: 0,
      winScr: 0,
      isSpFalg: false
    },
    created: function () {
      this.url = window.location
      this.hash = window.location.hash
    },
    mounted: function () {
      const _this = this
      window.addEventListener('scroll', function () {
        _this.winScr = window.scrollY || window.pageYOffset
      })

      this.currentWidth = window.innerWidths
      this.parentEl = this.$refs.main.parentNode
      // this.setScrollStyle()
      // XXX.jp/ の時は何もしない
      // XXX.jp/index.html#XXXX の時はスクロールする
      // if (this.hash !== '' && this.$el.className.indexOf('top') > 0) {
      //   this.scrollToTarget(this.hash)
      // } else {
      //   this.scrPos = window.scrollY || window.pageYOffset
      //   this.setScrollEventListener()
      // }
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.resize, false)
    },
    methods: {

      /* ------------------------------
      * スマホ判定
      ------------------------------ */
      isSmartPhone: function () {
        if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
          this.isSpFalg = true
        } else {
          this.isSpFalg = false
        }
      },

      /* ------------------------------
      * アンカーでの移動処理
      ------------------------------ */
      scrollToTarget: function (id) {
        const _this = this
        const targetId = id.replace('#', '')
        const targetPos = document.getElementById(targetId).offsetTop
        window.scrollTo(0, targetPos)
        gsap.to(this.$refs.main, {
          duration: 0.4,
          y: -targetPos,
          ease: 'sine.out',
          onComplete: function () {
            _this.scrPos = targetPos
            _this.setScrollEventListener()
          }
        })
      },

      /* ------------------------------
      * スクロールでぬるっとさせるためのstyle指定
      ------------------------------ */
      setScrollStyle: function () {
        const _this = this
        this.bodyH = Math.max.apply(null, [
          document.body.clientHeight,
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.documentElement.clientHeight
        ])

        gsap.set(this.parentEl, {
          height: _this.bodyH
        })
        gsap.set(this.$refs.main, {
          position: 'fixed'
        })
      },

      /* ------------------------------
      * スクロールでぬるっとの本体
      ------------------------------ */
      setScrollEventListener: function () {
        this.scrollEvent()
        window.addEventListener('resize', this.resize, false)
      },

      scrollEvent: function () {
        const _this = this
        const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
        console.log(window.scrollY || window.pageYOffset)

        function scrollAnimation () {
          const targetScr = window.scrollY || window.pageYOffset

          const targetYpos = _this.scrPos + (targetScr - _this.scrPos) * 0.1
          // 小数点第二位までにする
          const y = Math.round(targetYpos * 100) / 100
          requestAnimationFrame(scrollAnimation)
          gsap.set(_this.$refs.main, {
            y: -y,
            force3D: true
          })
          _this.scrPos = y
        }
        this.id = requestAnimationFrame(scrollAnimation)
      },
      /* ------------------------------
     * ぬるっとスクロールのリサイズ処理
     ------------------------------ */
      resize: function () {
        const _this = this
        // 横幅が変わったときのみリサイズ処理する
        if (this.currentWidth !== window.innerWidth) {
          this.currentWidth = window.innerWidth
          this.destroyScrollEvent()
          this.setScrollStyle()
          gsap.set(this.$refs.main, {
            y: -_this.scrPos
          })
        }
      },

      /* ------------------------------
     * ぬるっとスクロールの破棄
     ------------------------------ */
      destroyScrollEvent: function () {
        const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame

        gsap.set(this.parentEl, {
          height: ''
        })
        gsap.set(this.$refs.main, {
          position: '',
          y: ''
        })
        cancelAnimationFrame(this.id)
      },

      /* ------------------------------
      * グロナビの表示非表示フラグの切替処理
      ------------------------------ */
      toggleGnviFlag: function () {
        if (this.gNaviFlag) {
          this.gNaviFlag = false
        } else {
          this.gNaviFlag = true
        }
      },

      /* ------------------------------
      * グロナビのリンククリック時の制御
      ------------------------------ */
      scrLink: function (target) {
        // TOPのみ
        if (this.$el.className.indexOf('top') > 0) {
          this.scrollToTarget(target)
        }
        this.toggleGnviFlag()
      }
    }
  })
}
