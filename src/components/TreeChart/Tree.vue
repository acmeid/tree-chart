<template>
  <div class="hr-tree-chart-wrap">
    <div
      class="hr-tree-chart-content"
      :class="[sizeClass]">
      <TreeNode
        v-for="(item, index) in data" :key="index"
        :data="item"
        :index="index"
      >
      </TreeNode>
    </div>
    <!-- <div class="export-img" @click="exportImg">导出为图片</div> -->
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import TreeNode from './TreeNode.vue';
import saveImg from '@/components/TreeChart/saveImg';


export default {
  name: 'TreeChart',
  components: { TreeNode },
  provide() {
    return { tree: this };
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    loadData: {
      type: Function,
    },
    size: {
      type: Number,
      default: 2,
    },
    keyName: {
      type: Object,
      default: () => ({
        key: 'key',
        label: 'label',
        expand: 'expand',
        children: 'children',
        selected: 'selected',
      }),
    },
  },
  data() {
    return {
      a: 21,
      rowNum: this.data.length,
      rowWidth: 0,
      sizeValue: this.size,
    };
  },
  computed: {
    sizeClass() {
      return ['', 'mini', 'small', 'medium'][this.sizeValue];
    },
  },
  watch: {
    data() {
      this.getRowWidth();
    },
    size(val) {
      this.sizeValue = val;
    },
  },
  created() {
    this.getRowWidth();
    this.$on('changeExpand', () => {
      this.getRowWidth();
    });
  },
  methods: {
    getRowNum(list = this.data, parentNum = 0) {
      let num = list.length - parentNum > 0 ? list.length - parentNum : 0;
      console.log(num);
      for (let i = 0; i < list.length; i += 1) {
        const v = list[i];
        if (v.expand && v.children && v.children.length) {
          num += this.getRowNum(v.children, list.length);
        }
      }
      // console.log(num);
      return num;
    },
    getRowWidth() {
      const num = this.getRowNum();
      console.log(num);
    },
    exportImg() {
      html2canvas(document.querySelector('.hr-tree-chart-wrap')).then((canvas) => {
        // document.body.appendChild(canvas);
        saveImg(canvas);
      });
    },
    scale(size) {
      if (this.sizeValue + size >= 3) {
        this.sizeValue = 3;
      } else if (this.sizeValue + size <= 1) {
        this.sizeValue = 1;
      } else {
        this.sizeValue += size;
      }
    },
  },
};
</script>

<style lang="less">
.hr-tree-chart-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  // overflow: hidden;
}
.hr-tree-chart-content {
  position: absolute;
  top: 20px;
  left: 50%;
  // top: 50%;
  transform: translate(-50%, 0);
  transform: translate3d(0,0,0);
  // transform: translate(50%, 0);
}

.hr-tree-chart-content.medium {
  transform: scale(1.5);
}

.hr-tree-chart-content.mini {
  transform: scale(0.75);
}

</style>
