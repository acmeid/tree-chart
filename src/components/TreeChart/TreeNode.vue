<template>
  <div
    class="hr-tree-chart-node"
    :class="{'selected': data.selected, 'line': parentData}"
    @click.stop="onNode"
  >
  <!-- :style="[marginLeft]" -->
    <div class="hr-tree-chart-label">
      <span>{{data.label}}</span>
    </div>
    <div class="" v-if="loading">
      加载中...
    </div>
    <div class="hr-tree-chart-children" v-if="showChildren">
      <TreeNode
        v-for="(item, index) in data[this.children]" :key="index"
        :data="item"
        :index="index"
        :parent-data="data"
      >
      </TreeNode>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeNode',
  inject: ['tree'],
  props: {
    index: {
      type: Number,
      default: 0,
    },
    data: {
      type: Object,
      required: true,
    },
    parentData: {
      type: Object,
    },
  },
  data() {
    return {
      nodeWidth: 150,
      space: 20,
      loading: false,
      key: this.tree.keyName.key,
      label: this.tree.keyName.label,
      expand: this.tree.keyName.expand,
      children: this.tree.keyName.children,
    };
  },
  computed: {
    showChildren() {
      return this.data.expand && this.data[this.children] && this.data[this.children].length;
    },
  },
  created() {
    // console.log(this.parentData);
  },
  methods: {
    onNode() {
      if (this.parentData) {
        this.parentData.children.forEach((v, k) => {
          if (v !== this.data) {
            this.$set(this.parentData.children[k], 'expand', false);
            this.$set(this.parentData.children[k], 'selected', false);
          } else {
            // this.data.selected = true;
            this.$set(this.parentData.children[k], 'selected', true);
          }
        });
      }
      if (this.data.children && this.data.children.length) {
        this.data.expand = !this.data.expand;
        this.tree.$emit('changeExpand');
      } else if (this.data.children) {
        this.$set(this.data, 'expand', true);
        this.loading = true;
        this.tree.loadData(this.data, (res) => {
          this.$set(this.data, 'children', res);
          this.loading = false;
          this.tree.$emit('changeExpand');
        });
      }
    },
  },
};
</script>

<style lang="less">
@width: 150px;
@height: 80px;
@space: 20px;
@fontColor: #888;
@fontColorActive: #333;
@borderColor: #ccc;
@borderColorActive: #f36c28;
@borderWidth: 3px;
@lineColor: #aaa;
@lineWidth: 1px;
@background: #fff;

.hr-tree-chart-node {
  position: relative;
  // float: left;
  // display: table-cell;
  text-align: center;
  width: @width + @space;
  // height: @height;
  padding: 0 @space;
  // float: left;
  display: flex;
  // flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}


.hr-tree-chart-label {
  width: @width;
  height: @height;
  border: @borderWidth solid @borderColor;
  border-radius: 8px;
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
  background: @background;
  color: @fontColor;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hr-tree-chart-children {
  position: relative;
  // position: absolute;
  // top: @height + @space * 2;
  // left: 50%;
  // margin-left: -(@width + @space) / 2;
  // margin-left: -50%;
  // transform: translate(-50%, 0);
  margin-top: @space * 2;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  // flex-wrap: wrap;


  &:before {
    content: "";
    position: absolute;
    top: -@space * 2;
    left: 50%;
    width: 0;
    height: @space;
    border-left: 1px solid @lineColor;
  }
}

.hr-tree-chart-node.selected {
  >.hr-tree-chart-label {
    border-color: @borderColorActive;
    color: @fontColorActive;
  }
}

.hr-tree-chart-node.line {
    &:before {
    content: "";
    position: absolute;
    top: -@space;
    left: 0;
    width: 100%;
    height: 0;
    border-top: @lineWidth solid @lineColor;
  }

  &:after {
    content: "";
    position: absolute;
    top: -@space;
    left: 50%;
    width: 0;
    height: @space;
    border-left: @lineWidth solid @lineColor
    ;
  }

  &:first-child {
    &:before {
      width: 50%;
      left: 50%;
    }
  }
  &:last-child {
    &:before {
      width: 50%;
      right: 50%;
    }
  }
}
</style>
