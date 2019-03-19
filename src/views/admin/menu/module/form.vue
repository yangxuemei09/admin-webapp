<template>
  <div>
    <el-form ref="form" :model="form_data" :rules="rules" size="small" label-width="90px">
      <el-form-item :label="$t('adminMenu.menuId')" hidden prop="menuId">
        <el-input v-model="form_data.menuId"/>
      </el-form-item>
      <el-form-item :label="$t('adminMenu.name')" prop="name">
        <el-input v-model="form_data.name"/>
      </el-form-item>
      <el-form-item :label="$t('adminMenu.nameEn')" prop="nameEn">
        <el-input v-model="form_data.nameEn"/>
      </el-form-item>
      <el-form-item :label="$t('adminMenu.icon')">
        <el-popover
          placement="bottom-start"
          width="460"
          trigger="click"
          @show="$refs['iconSelect'].reset()">
          <IconSelect ref="iconSelect" @selected="selected" />
          <el-input slot="reference" v-model="form_data.icon" :placeholder="$t('adminMenu.iconChoose')" readonly>
            <svg-icon v-if="form_data.icon" slot="prefix" :icon-class="form_data.icon" class="el-input__icon" style="height: 32px;width: 16px;" />
            <i v-else slot="prefix" class="el-icon-search el-input__icon"/>
          </el-input>
        </el-popover>
      </el-form-item>
      <el-form-item :label="$t('adminMenu.path')" prop="path">
        <el-input v-model="form_data.path"/>
      </el-form-item>
      <el-form-item :label="$t('adminMenu.component')" prop="component">
        <el-input v-model="form_data.component"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="form_footer">
      <el-button @click="cancelClick">{{ $t('common.cancel') }}</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit()" >{{ $t('common.confirm') }}</el-button>
    </div>
  </div>
</template>

<script>
import { addAdminMenu, editAdminMenu } from '@/api/admin/menu'
import IconSelect from '@/components/IconSelect'
export default {
  components: { IconSelect },
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
          { required: true, message: this.$t('adminMenu.validateName'), trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.$refs['form'].clearValidate()
  },
  methods: {
    cancelClick() {
      this.$refs['form'].clearValidate()
      this.cancel()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          const formData = {
            menuId: this.form_data.menuId,
            name: this.form_data.name,
            nameEn: this.form_data.nameEn,
            icon: this.form_data.icon,
            path: this.form_data.path,
            component: this.form_data.component
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
      addAdminMenu(formData).then(() => {
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
      editAdminMenu(formData).then(() => {
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
    },
    selected(name) {
      this.form_data.icon = name
    }
  }
}
</script>

<style scoped>
</style>
