<template>
  <a-col class="ant-form-vertical">
    <a-input v-model:value="title" name="title" />
    <a-textarea name="description" v-model:value="description" auto-size />
    <a-button @click="cancel()">Cancel</a-button>
    <a-button @click="handleSubmit" style="float: 'right'">Submit</a-button>
  </a-col>
</template>
<script lang="ts">
import { Maybe } from "graphql/jsutils/Maybe";
import { defineComponent, PropType, ref } from "vue";
import { User } from "../../../../react-datastore/src/datastore/generated";
import { useAddTodo } from "../../datastore/hooks";

export default defineComponent({
  name: "AddTodo",
  props: {
    cancel: {
      type: Function,
      required: true,
    },
    currentUser: {
      type: Object as PropType<Maybe<User>>,
      required: true,
    },
  },
  setup(props) {
    const { save: addTodo } = useAddTodo();

    const title = ref("");
    const description = ref("");

    const handleSubmit = () => {
      addTodo({
        title: title.value,
        description: description.value,
        completed: false,
      })
        .then(() => props.cancel())
        .catch((error: any) => console.log(error));
    };
    return { title, description, handleSubmit };
  },
});
</script>
