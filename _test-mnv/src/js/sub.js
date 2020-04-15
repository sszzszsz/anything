/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import gsap from 'gsap'
// import * as Vue from 'vue/dist/vue.min'
import Vue from 'vue/dist/vue'

export function test () {
  var vm = new Vue({
    el: '.l_contents',
    data: {
      gNaviFlag: false,
      scrTop: 0
    },
    created: function () {
      this.url = window.location
      this.hash = window.location.hash
      console.log(this.hash)
    },
    mounted: function () {
      console.log('mounted')
      if (this.hash !== '') {
        this.scrollToTarget(this.hash)
      }
      this.setScrollEventListener()
    },
    methods: {
      scrollToTarget: function (id) {
        const targetId = id.replace('#', '')
        const targetPos = document.getElementById(targetId).offsetTop
        gsap.to(this.$refs.main, {
          duration: 0.5,
          y: -targetPos,
          onComplete: function () {
            console.log('scrollToTarget')
          }
        })
      },
      /* ------------------------------
     * ぬるっとスクロール
     ------------------------------ */
      setScrollEventListener: function () {
        // 初期状態
        const bodyH = Math.max.apply(null, [
          document.body.clientHeight,
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.documentElement.clientHeight
        ])
        const parentEl = this.$refs.main.parentNode

        gsap.set(parentEl, {
          height: bodyH
        })
        gsap.set(this.$refs.main, {
          width: '100%',
          position: 'fixed'
        })

        // スクロールでぬるっとの本体
        const scrElement = this.$refs.main
        window.addEventListener('scroll', scrollEvent, { passive: true })
        function scrollEvent () {
          gsap.to(scrElement, {
            duration: 0.4,
            y: -window.pageYOffset,
            ease: 'sine.out',
            onComplete: function () {
              console.log('ぬるっとスクロール')
            }
          })
        }
      },

      /* ------------------------------
     * ぬるっとスクロールの破棄
     ------------------------------ */
      destroyScrollEvent: function () {
        gsap.set(this.$refs.main, {
          width: '100%',
          position: '',
          y: ''
        })
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
