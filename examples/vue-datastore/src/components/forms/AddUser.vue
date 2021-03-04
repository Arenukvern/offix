<template>
  <a-col class="ant-form-vertical">
    <a-input v-model:value="name" name="name" />
    <a-button @click="cancel()">Cancel</a-button>
    <a-button @click="handleSubmit" style="float: 'right'">Submit</a-button>
  </a-col>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useAddUser } from "../../datastore/hooks";

export default defineComponent({
  name: "AddTodo",
  props: {
    cancel: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { save: addUser } = useAddUser();

    const name = ref("");

    const handleSubmit = () => {
      addUser({
        name: name.value,
      })
        .then(() => props.cancel())
        .catch((error: any) => console.log(error));
    };
    return { name, handleSubmit };
  },
});
</script>
