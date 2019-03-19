<template>
  <div style="display: inline-block">
    <el-button size="mini" class="button" type="info" @click="dialog = true">{{ $t('common.edit') }}</el-button>
    <el-dialog :visible.sync="dialog" :title="title" width="500px" @close="cancel">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="88px">
        <el-form-item :label="$t('adminUser.oldPassword')" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password" auto-complete="on" style="width: 370px;"/>
        </el-form-item>
        <el-form-item :label="$t('adminUser.newPassword')" prop="password">
          <el-input v-model="form.password" type="password" auto-complete="on" style="width: 370px;"/>
        </el-form-item>
        <el-form-item :label="$t('adminUser.confirmPassword')" prop="confirmPass">
          <el-input v-model="form.confirmPass" type="password" auto-complete="on" style="width: 370px;"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancel">{{ $t('common.cancel') }}</el-button>
        <el-button :loading="loading" type="primary" @click="doSubmit">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import { md5 } from '@/utils/md5'
import { editAdminUserPassword } from '@/api/admin/user'
export default {
  data() {
    const confirmPass = (rule, value, callback) => {
      if (this.form.password !== value) {
        callback(new Error(this.$t('adminUser.validatePasswordDiffer')))
      } else {
        callback()
      }
    }
    return {
      loading: false, dialog: false, title: this.$t('adminUser.editPassword'), form: { oldPassword: '', password: '', confirmPass: '' },
      rules: {
        oldPassword: [
          { required: true, message: this.$t('adminUser.validateOldPassword'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('adminUser.validateNewPassword'), trigger: 'blur' },
          { min: 6, max: 20, message: this.$t('adminUser.validatePasswordLen'), trigger: 'blur' }
        ],
        confirmPass: [
          { required: true, validator: confirmPass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'name'
    ])
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          const formData = {
            name: this.name,
            userId: this.userId,
            password: md5(this.form.password),
            oldPassword: md5(this.form.oldPassword)
          }
          console.log('formData======', formData)
          editAdminUserPassword(formData).then(res => {
            this.resetForm()
            this.$notify({
              title: this.$t('adminUser.reLogin'),
              type: 'success',
              duration: 1500
            })
            setTimeout(() => {
              store.dispatch('LogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
              })
            }, 1500)
          }).catch(err => {
            this.loading = false
            console.log(err.response.data.message)
          })
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { oldPassword: '', password: '', confirmPass: '' }
    }
  }
}
</script>

<style scoped>

</style>
