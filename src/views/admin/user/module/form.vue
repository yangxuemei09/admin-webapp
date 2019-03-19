<template>
  <div>
    <el-form ref="form" :model="form_data" :rules="rules" size="small" label-width="66px">
      <el-form-item :label="$t('adminUser.userId')" hidden prop="userId">
        <el-input v-model="form_data.userId"/>
      </el-form-item>
      <el-form-item :label="$t('adminUser.userName')" prop="userName">
        <el-input v-model="form_data.userName"/>
      </el-form-item>
      <el-form-item :label="$t('adminUser.mobile')" prop="mobile">
        <el-input v-model="form_data.mobile"/>
      </el-form-item>
      <el-form-item :label="$t('adminUser.email')" prop="email">
        <el-input v-model="form_data.email"/>
      </el-form-item>
      <el-form-item :label="$t('adminUser.roleId')" prop="roleId">
        <el-input v-model="form_data.roleId"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="form_footer">
      <el-button @click="cancelClick">{{ $t('common.cancel') }}</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit()" >{{ $t('common.confirm') }}</el-button>
    </div>
  </div>
</template>

<script>
import { addAdminUser, editAdminUser } from '@/api/admin/user'
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
        userName: [
          { required: true, message: this.$t('adminUser.validateUserName'), trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: this.$t('adminUser.validateMobile'), trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: this.$t('adminUser.validateRoleId'), trigger: 'blur' }
        ]
      }
    }
  },
  created() {
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
            userId: this.form_data.userId,
            userName: this.form_data.userName,
            mobile: this.form_data.userName,
            email: this.form_data.email,
            roleId: this.form_data.roleId
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
      addAdminUser(formData).then(() => {
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
      editAdminUser(formData).then(() => {
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
