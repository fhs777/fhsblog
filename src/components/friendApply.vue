<template>
<div class="friendApply">
  <a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish1"
    @validate="handleValidate"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item has-feedback label="网站名称" name="name">
      <a-input v-model:value="formState.name" type="text" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="网站地址" name="url">
      <a-input v-model:value="formState.url" type="text" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="网站介绍" name="words">
      <a-input v-model:value="formState.words" type="text" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="网站logo" name="logo">
      <a-input v-model:value="formState.logo" type="text" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="您的邮箱" name="email">
      <a-input v-model:value="formState.email" type="text" autocomplete="off" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">申请友链</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">清空</a-button>
    </a-form-item>
  </a-form>
</div>
</template>

<script>
import { apply_friend } from '../api/api'
import { reactive, ref } from 'vue';
export default {
   setup() {
    const formRef = ref();
    const formState = reactive({
      name: '',
      url: '',
      words: '',
      logo: '',
      email: '',
    });

    let checkName = async (_rule, value) => {
      if (!value) {
        return Promise.reject('网站名称不能为空');
      }

     else {
          return Promise.resolve();
      }
    };

    let validateUrl = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('网站地址不能为空');
      } else {  
        return Promise.resolve();
      }
    };

    let validateWords = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('网站介绍不能为空');
      }
      else {
        return Promise.resolve();
      }
    };

    let checkLogo = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('网站logo不能为空');
      }
      else {
        return Promise.resolve();
      }
    };

    let checkEmail   = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('通知邮箱不能为空');
      }
      else {
        return Promise.resolve();
      }
    };

    const rules = {
      url: [{
        required: true,
        validator: validateUrl,
        trigger: 'change',
      }],
      words: [{
        required: true,
        validator: validateWords,
        trigger: 'change',
      }],
      name: [{
        required: true,
        validator: checkName,
        trigger: 'change',
      }],
      logo: [{
        required: true,
        validator: checkLogo,
        trigger: 'change',
      }],
      email: [{
        required: true,
        validator: checkEmail,
        trigger: 'change',
      }],
    };
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    };

    const handleFinishFailed = errors => {
      console.log(errors);
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    const handleValidate = (...args) => {
      console.log(args);
    };

    return {
      formState,
      formRef,
      rules,
      layout,
      handleFinishFailed,
      resetForm,
      handleValidate,
    };
  },


  methods: {
    handleFinish1(values) {
      console.log(values, this.formState);
      this.fhstest()
    },
    fhstest() {
      let parmas = {
        examineState: false,
        words: this.formState.words,
        avater: this.formState.avater,
        website: this.formState.website,
        email: this.formState.email,
        name: this.formState.name,
      }
      apply_friend(parmas).then(res => {
        console.log(res)
      })
    },
  },

}
</script>

<style lang="less" scoped>

.friendApply {
  margin-top: 30px;
  text-align: left;
}

</style>>

