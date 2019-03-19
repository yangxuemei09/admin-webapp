<template>
  <div>
    <el-form ref="form" :model="form_data" :rules="rules" size="small" label-width="100px">
      <el-form-item :label="$t('adminQuartzJob.quartzJobId')" hidden prop="quartzJobId">
        <el-input v-model="form_data.quartzJobId"/>
      </el-form-item>
      <el-form-item :label="$t('adminQuartzJob.jobName')" prop="jobName">
        <el-input v-model="form_data.jobName"/>
      </el-form-item>
      <el-form-item :label="$t('adminQuartzJob.beanName')" prop="beanName">
        <el-input v-model="form_data.beanName"/>
      </el-form-item>
      <el-form-item :label="$t('adminQuartzJob.methodName')" prop="methodName">
        <el-input v-model="form_data.methodName"/>
      </el-form-item>
      <el-form-item :label="$t('adminQuartzJob.params')" prop="params">
        <el-input v-model="form_data.params"/>
      </el-form-item>
      <el-form-item :label="$t('adminQuartzJob.cronExpression')" prop="cronExpression">
        <el-input v-model="form_data.cronExpression"/>
      </el-form-item>
      <el-form-item :label="$t('adminQuartzJob.remark')" prop="remark">
        <el-input v-model="form_data.remark"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="form_footer">
      <el-button @click="cancelClick">{{ $t('common.cancel') }}</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit()" >{{ $t('common.confirm') }}</el-button>
    </div>
  </div>
</template>

<script>
import { addAdminQuartzJob, editAdminQuartzJob } from '@/api/admin/quartzJob'
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
        jobName: [
          { required: true, message: this.$t('adminQuartzJob.validateJobName'), trigger: 'blur' }
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
      this.cancel()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          const formData = {
            quartzJobId: this.form_data.quartzJobId,
            jobName: this.form_data.jobName,
            beanName: this.form_data.beanName,
            methodName: this.form_data.methodName,
            params: this.form_data.params,
            cronExpression: this.form_data.cronExpression,
            remark: this.form_data.remark
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
      addAdminQuartzJob(formData).then(() => {
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
      editAdminQuartzJob(formData).then(() => {
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
