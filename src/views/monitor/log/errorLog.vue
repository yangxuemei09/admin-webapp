<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="userName" label="用户名"/>
      <el-table-column prop="requestIp" label="IP"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column :show-overflow-tooltip="true" prop="method" label="方法名称"/>
      <el-table-column :show-overflow-tooltip="true" prop="params" label="参数"/>
      <el-table-column prop="createTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="异常详情" width="120px">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="info(scope.row.exceptionDetail)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialog" style="margin-left: 100px" title="异常详情" top="0" width="85%">
      <span>
        {{ errorInfo }}
      </span>
    </el-dialog>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import initData from '@/mixins/initData'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
export default {
  components: { eHeader },
  mixins: [initData],
  data() {
    return {
      errorInfo: '', dialog: false
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    beforeInit() {
      this.url = 'api/logs/error'
      const sort = 'id,desc'
      const query = this.query
      const userName = query.userName
      const logType = query.logType
      this.params = { page: this.page, size: this.size, sort: sort }
      if (userName && userName) { this.params['userName'] = userName }
      if (logType !== '' && logType !== null) { this.params['logType'] = logType }
      return true
    },
    info(errorInfo) {
      this.errorInfo = errorInfo
      this.dialog = true
    }
  }
}
</script>

<style scoped>

</style>
