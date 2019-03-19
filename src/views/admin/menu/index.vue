<template>
  <div class="app-container">
    <div class="head-container">
      <el-input :placeholder="$t('adminMenu.name')" v-model="listQuery.name" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('common.search') }}</el-button>
    </div>
    <div class="operate-container" style="display: inline-block;margin: 0px 2px;">
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="handleCreate">{{ $t('common.add') }}</el-button>
    </div>
    <tree-table v-loading="listLoading" :data="list" :expand-all="true" :columns="columns" border size="small">
      <el-table-column :label="$t('adminMenu.icon')" prop="icon" align="center" width="80px">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('adminMenu.sort')" prop="sort" align="center" width="100px">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.sort }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" :label="$t('adminMenu.path')" align="center" prop="path"/>
      <el-table-column :show-overflow-tooltip="true" :label="$t('adminMenu.component')" align="center" prop="component"/>
      <el-table-column :label="$t('common.addTime')" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.addTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('common.edit') }}</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('common.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </tree-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="operateType === 1 ? this.$t('common.add'): this.$t('common.edit')" :visible.sync="dialogVisible" width="500px">
      <eForm :form_data="formData" :operate_type="operateType" :cancel="handleFormCancel" :headle_ok="headleFormOK" />
    </el-dialog>
  </div>
</template>

<script>
import { getMenusTree, deleteAdminMenu } from '@/api/admin/menu'
import treeTable from '@/components/TreeTable'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { parseTime } from '@/utils/index'
import eForm from './module/form'

export default {
  name: 'ComplexTable',
  components: { treeTable, Pagination, eForm },
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
      columns: [
        {
          text: this.$t('adminMenu.name'),
          value: 'name'
        }
      ],
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        name: ''
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
      getMenusTree(this.listQuery).then(response => {
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
        formData.menuId = row.menuId
        deleteAdminMenu(formData).then(() => {
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
