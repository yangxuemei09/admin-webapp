<template>
  <div class="app-container">
    <div class="head-container">
      <el-input :placeholder="$t('adminUser.userName')" v-model="listQuery.userName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('common.search') }}</el-button>
    </div>
    <div class="operate-container" style="display: inline-block;margin: 0px 2px;">
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="handleCreate">{{ $t('common.add') }}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column :label="$t('adminUser.userName')" width="150px" align="center" prop="userName" />
      <el-table-column :label="$t('adminUser.avatar')" width="80px" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" class="el-avatar">
        </template>
      </el-table-column>
      <el-table-column :label="$t('adminUser.mobile')" width="120px" align="center" prop="mobile" />
      <el-table-column :label="$t('adminUser.email')" width="150px" align="center" prop="email" />
      <el-table-column :label="$t('adminUser.userStatus')" width="100px" align="center" prop="userStatus" />
      <el-table-column :label="$t('adminUser.roleName')" width="150px" align="center" prop="roleName" />
      <el-table-column :label="$t('adminUser.addTime')" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.addTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.updateTime')" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.actions')" fixed="right" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('common.edit') }}</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('common.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="operateType === 1 ? this.$t('common.add'): this.$t('common.edit')" :visible.sync="dialogVisible" width="500px">
      <eForm :form_data="formData" :operate_type="operateType" :cancel="handleFormCancel" :headle_ok="headleFormOK" />
    </el-dialog>
  </div>
</template>

<script>
import { getAdminUserList, deleteAdminUser } from '@/api/admin/user'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { parseTime } from '@/utils/index'
import eForm from './module/form'

export default {
  name: 'ComplexTable',
  components: { Pagination, eForm },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        userName: ''
      },
      formData: {},
      dialogVisible: false,
      operateType: 0 // 1：新增，2：修改
    }
  },
  created() {
    this.getList()
  },
  methods: {
    parseTime,
    getList() {
      this.listLoading = true
      getAdminUserList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleFormCancel() {
      this.operateType = 0
      this.dialogVisible = false
    },
    headleFormOK() {
      this.getList()
      this.operateType = 0
      this.dialogVisible = false
    },
    handleCreate() {
      this.formData = {}
      this.operateType = 1
      this.dialogVisible = true
    },
    handleUpdate(row) {
      this.formData = Object.assign({}, row)
      this.operateType = 2
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.$confirm(this.$t('common.confirmDeletion'), this.$t('common.tips'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        const formData = {}
        formData.userId = row.userId
        deleteAdminUser(formData).then(() => {
          this.getList()
          this.dialogVisible = false
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.deleteSuccessMsg'),
            type: 'success',
            duration: 2000
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('common.deleteCancelMsg')
        })
      })
    }
  }
}
</script>
