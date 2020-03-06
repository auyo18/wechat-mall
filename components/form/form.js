// components/form/form.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    phone: {
      type: String,
      value: ''
    },
    password: {
      type: String,
      value: ''
    },
    confirmPassword: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPhoneInput(e) {
      this.triggerEvent('phoneInput', e.detail.value.trim())
    },
    bindPasswordInput(e) {
      this.triggerEvent('passwordInput', e.detail.value.trim())
    },
    bindConfirmPasswordInput(e) {
      this.triggerEvent('confirmPasswordInput', e.detail.value.trim())
    },
    clearInput(e) {
      this.triggerEvent('clearInput', e.currentTarget.id)
    }
  }
})