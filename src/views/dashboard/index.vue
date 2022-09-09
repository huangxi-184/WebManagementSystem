<template>
  <div>
    <Card></Card>
    <Sale></Sale>
    <github-corner class="github-corner" />
  </div>
</template>

<script>
import GithubCorner from '../../components/GithubCorner/index';
import Card from './card/index.vue';
import Sale from './Sale/index.vue';
export default {
  name: "",
  components: {
    Card,
    Sale,
    GithubCorner
  }

}
</script>

<style  scoped>
.github-corner {
  position: absolute;
  top: 0px;
  border: 0;
  right: 0;
}
</style>
