<template>
  <div>
    <div class="weui-uploader" style="padding:15px;">
      <div class="weui-uploader__hd">
          <p class="weui-uploader__title">{{info.title}}</p>
          <div class="weui-uploader__info"></div>
      </div>
      <div class="weui-uploader__bd">
        <div class="weui-uploader__files">
          <img
            class="weui-uploader__file"
            v-for="(item, index) in info.fileList"
            :key="index"
            :src="item.src"
            @click="previewImg(item, index)">
        </div>
        <div v-if="!onlyPreview" class="weui-uploader__input-box">
          <input @change="uploadPic($event)" class="weui-uploader__input" type="file" accept="image/*" />
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="show" class="dialog-demo">
        <div @click="show=false">
          <span class="vux-close"></span>
        </div>
        <div class="img-box">
          <img :src="picPath" style="max-width:100%">
        </div>
        <div class="btn-center">
          <x-button @click.native="deletePic" mini plain type="warn">删除图片</x-button>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
  import { XDialog, TransferDomDirective as TransferDom, XButton, XInput, Group } from 'vux'
  import EXIF from 'exif-js'
  import qs from 'qs'

  export default {
    props: {
      info: Object,
      uploadUserId: String,
      onlyPreview: Boolean
    },
    directives: {
      TransferDom
    },
    components: {
      XDialog, XButton, XInput, Group
    },
    data () {
      return {
        show: false,
        index: 0,
        picPath: '',
        id: ''
      }
    },
    methods: {
      previewImg (item, index) {
        this.show = true
        this.index = index
        this.picPath = item.src
        this.id = item.id
      },
      deletePic () {
        this.axios({
          url: '/lf/file/deleteFile',
          method: 'post',
          data: qs.stringify({
            id: this.id
          })
        }).then(res => {
          if (res.data.errcode) {
            this.toast(res.data.msg)
            return
          }
          this.show = false
          this.$vux.toast.show({
            text: '删除成功',
            type: 'success'
          })
          this.info.fileList.splice(this.index, 1)
        })
      },
      uploadPic (e) {
        // 上传之前先压缩
        this.compressImg(e.target.files[0], imgBase64Str => {
          this.$vux.loading.show({
            text: '正在上传...'
          })
          // 上传图片
          var formData = new FormData()
          formData.append('fileType', this.info.fileType)
          formData.append('uploadUserId', this.uploadUserId)
          formData.append('imgStr', imgBase64Str)
          this.axios({
            url: '/lf/file/fileUploadBase64',
            method: 'post',
            data: formData
          }).then(res => {
            if (res.data.errcode) {
              this.toast(res.data.msg)
              return
            }
            this.$vux.loading.hide()
            this.$vux.toast.show({
              text: '上传成功',
              type: 'success'
            })
            this.info.fileList.push({
              src: imgBase64Str,
              id: res.data.data.id
            })
          }).catch(error => {
            console.log(error)
            this.$vux.loading.hide()
            this.toast('上传失败')
          })
        })
      },
      compressImg: function (file, callback) {
        var self = this
        var hidCanvas = document.createElement('canvas')

        // 生成隐藏画布
        if (!hidCanvas.getContext) {
          this.toast('对不起，您的浏览器不支持图片压缩及上传功能，请换个浏览器试试')
          return
        }

        var hidCtx = hidCanvas.getContext('2d')
        var reader = new FileReader()

        reader.onload = function (evt) {
          var p = new Image()
          var srcString = evt.target.result

          // 安卓获取的base64数据无信息头，加之
          if (srcString.substring(5, 10) !== 'image') {
            p.src = srcString.replace(/(.{5})/, '$1image/jpeg;')
          } else {
            p.src = srcString
          }
          var orientation = 1
          // 获取图像的方位信息
          EXIF.getData(file, function () {
            orientation = parseInt(EXIF.getTag(this, 'Orientation')) || 1
          })
          p.onload = function () {
            var upImgWidth = p.width
            var upImgHeight = p.height

            // 压缩换算后的图片高度
            var afterWidth = upImgWidth / 2
            var afterHeight = afterWidth * upImgHeight / upImgWidth;
            if (upImgWidth < 10 || upImgWidth < 10) {
              this.toast('请不要上传过小的图片')
              return false
            }
            if (orientation <= 4) {
              // 设置压缩canvas区域高度及宽度
              hidCanvas.setAttribute('height', afterHeight)
              hidCanvas.setAttribute('width', afterWidth)
              if (orientation === 3 || orientation === 4) {
                hidCtx.translate(afterWidth, afterHeight)
                hidCtx.rotate(180 * Math.PI / 180)
              }
            } else {
              // 设置压缩canvas区域高度及宽度
              hidCanvas.setAttribute('height', afterWidth)
              hidCanvas.setAttribute('width', afterHeight)

              if (orientation === 5 || orientation === 6) {
                hidCtx.translate(afterHeight, 0)
                hidCtx.rotate(90 * Math.PI / 180)
              } else if (orientation === 7 || orientation === 8) {
                hidCtx.translate(0, afterWidth)
                hidCtx.rotate(270 * Math.PI / 180)
              }
            }
            // canvas绘制压缩后图片
            self.drawImageIOSFix(hidCtx, p, 0, 0, upImgWidth, upImgHeight,
                            0, 0, afterWidth, afterHeight)
            // 获取压缩后生成的img对象
            // item.thumbnail = self.convertCanvasToImage(hidCanvas).src
            // 此处将得到的图片数据回调
            if (callback !== undefined) {
              callback(self.convertCanvasToImage(hidCanvas).src)
            }
          }
        }
        reader.readAsDataURL(file)
      },
      convertCanvasToImage: function (canvas) {
        var image = new Image()
        image.src = canvas.toDataURL('image/jpeg')
        return image
      },
      detectVerticalSquash: function (img) {
        // var iw = img.naturalWidth
        var ih = img.naturalHeight
        var canvas = document.createElement('canvas')
        canvas.width = 1
        canvas.height = ih
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        var data = ctx.getImageData(0, 0, 1, ih).data
        // search image edge pixel position in case it is squashed vertically.
        var sy = 0
        var ey = ih
        var py = ih
        while (py > sy) {
          var alpha = data[(py - 1) * 4 + 3]
          if (alpha === 0) {
            ey = py
          } else {
            sy = py
          }
          py = (ey + sy) >> 1
        }
        var ratio = (py / ih)
        return (ratio === 0) ? 1 : ratio
      },
      drawImageIOSFix: function (ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
        var vertSquashRatio = this.detectVerticalSquash(img)
        ctx.drawImage(img, sx * vertSquashRatio, sy * vertSquashRatio,
                           sw * vertSquashRatio, sh * vertSquashRatio,
                           dx, dy, dw, dh)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/weui/widget/weui-uploader/index.less';
  @import '~vux/src/styles/close';
  .img-item {
    width: 100%;
  }
  .dialog-demo {
    .weui-dialog{
      border-radius: 8px;
      padding-bottom: 8px;
    }
    .dialog-title {
      line-height: 30px;
      color: #666;
    }
    .img-box {
      padding: 20px;
    }
    .vux-close {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
</style>
