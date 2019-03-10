<template>
  <div class="wrap">
    <TreeChart
      ref="orgChart"
      class="org-chart"
      :data="treeData"
      :loadData="loadData"
    ></TreeChart>

    <div class="action-bar">
      <div class="export-img" @click="exportImg">导出为图片</div>
      <div class="export-img" @click="handleScale(1)">放大</div>
      <div class="export-img" @click="handleScale(-1)">缩小</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import TreeChart from '@/components/TreeChart/Tree.vue';


@Component({
  components: { TreeChart },
})
export default class TreeDemo extends Vue {
  // $refs!: { orgChart: TreeChart}

  treeData = [
    {
      id: 1,
      label: '集团',
      expand: true,
      children: [
        {
          id: 2,
          label: '公司',
          expand: true,
          children: [
            {
              id: 4,
              label: '部门',
              expand: true,
              children: [],
            },
            {
              id: 5,
              label: '部门2',
              expand: true,
              children: [],
            },
            {
              id: 5,
              label: '部门2',
              expand: true,
              children: [],
            },
          ],
        },
        {
          id: 3,
          label: '机构',
          expand: true,
          children: [],
        },
        {
          id: 3,
          label: '机构',
          expand: true,
          children: [],
        },
        {
          id: 3,
          label: '机构',
          expand: true,
          children: [],
        },
        {
          id: 3,
          label: '机构',
          expand: true,
          children: [],
        },
      ],
    },
  ];

  loadData(item: object, callback: (data: object) => any) {
    setTimeout(() => {
      const data = [
        {
          id: 4,
          label: '组织1',
          expand: true,
          children: [],
        },
        {
          id: 5,
          label: '组织2',
          expand: true,
          children: [],
        },
        {
          id: 5,
          label: '组织3',
          expand: true,
          children: [],
        },
        {
          id: 5,
          label: '组织4',
          expand: true,
          children: [],
        },
      ];
      callback(data);
    }, 1200);
  }

  exportImg() {
    (this.$refs.orgChart as any).exportImg();
  }

  handleScale(size: number) {
    (this.$refs.orgChart as any).scale(size);
  }
}
</script>

<style scoped lang="less">
.wrap {
  width: 100vw;
  height: 100vh;
  background: rgb(250,250,250);
}
.org-chart {
  // width: 80%;
  // height: 80%;
}
// .export-img {
//   position: absolute;
//   right: 10px;
//   top: 10px;
// }
.action-bar {
  position: absolute;
  right: 0;
  top: 0;
  // width: 250px;
  >div{
    float: left;
    padding: 8px 10px;
    margin: 0 5px;
    cursor: pointer;
    background: #ddd;
  }
}
</style>
