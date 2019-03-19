<template>
  <div>
    <el-form ref="form" :model="form_data" :rules="rules" size="small" label-width="66px">
      <el-form-item :label="$t('adminRole.roleId')" hidden prop="roleId">
        <el-input v-model="form_data.roleId"/>
      </el-form-item>
      <el-form-item :label="$t('adminRole.name')" prop="name">
        <el-input v-model="form_data.name"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="form_footer">
      <el-button @click="cancelClick">{{ $t('common.cancel') }}</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit()" >{{ $t('common.confirm') }}</el-button>
    </div>
  </div>
</template>

<script>
import { addAdminRole, editAdminRole } from '@/api/admin/role'
export default {
  props: {
    operate_type: {
      type: Number,
      required: true
    },
    form_data: {
      type: Object,
      default: null
    },
    cancel: {
      type: Function,
      default: null
    },
    headle_ok: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      rules: {
        name: [
          { required: true, message: this.$t('adminRole.validateName'), trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.$refs['form'].resetFields()
    this.$refs['form'].clearValidate()
  },
  methods: {
    cancelClick() {
      this.$refs['form'].resetFields()
      // this.$refs['form'].clearValidate()
      this.cancel()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          const formData = {
            roleId: this.form_data.roleId,
            name: this.form_data.name
          }
          if (this.operate_type === 1) {
            this.doAdd(formData)
          } else {
            this.doEdit(formData)
          }
        } else {
          return false
        }
      })
    },
    doAdd(formData) {
      addAdminRole(formData).then(() => {
        this.$refs['form'].resetFields()
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.addSuccessMsg'),
          type: 'success',
          duration: 2000
        })
        this.loading = false
        this.headle_ok()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit(formData) {
      editAdminRole(formData).then(() => {
        this.$refs['form'].resetFields()
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.editSuccessMsg'),
          type: 'success',
          duration: 2000
        })
        this.loading = false
        this.headle_ok()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    }
  }
}
</script>

<style scoped>
</style>
