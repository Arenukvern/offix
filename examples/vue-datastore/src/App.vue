<template>
  <Loading v-if="loading" />
  <Error v-else-if="error" :message="error.message" />
  <div :style="containerStyle" v-else>
    <div style="width: 60%">
      <a-page-header
        :title="isNotToAddView ? 'Offix Todo' : 'Add Todo'"
        @back="isNotToAddView ? null : (isToAddTodoView = false)"
      >
        <template v-slot:extra v-if="isNotToAddView">
          <a-button type="primary" @click="isToAddTodoView = true" ghost>
            Add Todo
          </a-button>
          <a-button type="primary" @click="isToAddUserView = true" ghost>
            Register
          </a-button>
          <a-button type="primary" danger ghost>
            {{ replicating ? "Online" : "Offline" }}
          </a-button>
        </template>
        <TodoList v-if="isNotToAddView" :todos="data" />
        <AddTodo
          v-else-if="isToAddTodoView"
          :user="currentUser"
          :cancel="cancelAddTodo"
        />
        <AddUser v-else-if="isToAddUserView" :cancel="cancelAddUser" />
      </a-page-header>
    </div>
  </div>
</template>
<script lang="ts">
import { NetworkStatusEvent } from "offix-datastore/types/replication/network/NetworkStatus";
import { computed, defineComponent, onMounted, ref, toRefs, watch } from "vue";
import { Error, TodoList } from "./components";
import { datastore } from "./datastore/config";
import { useFindTodos, useFindUsers } from "./datastore/hooks";
import Loading from "./components/UI/Loading.vue";
import AddTodo from "./components/forms/AddTodo.vue";
import AddUser from "./components/forms/AddUser.vue";
export default defineComponent({
  name: "App",
  components: {
    AddTodo,
    AddUser,
    Error,
    Loading,
    TodoList,
  },
  setup() {
    const containerStyle = {
      display: "flex",
      alignItems: "start",
      justifyContent: "center",
      minHeight: "100vh",
      width: "100vw",
      padding: "2em 0",
    };
    const replicating = ref(false);
    const isToAddTodoView = ref(false);
    const isToAddUserView = ref(false);
    const isNotToAddView = computed(
      () => !isToAddTodoView.value && !isToAddUserView.value
    );
    const { state, subscribeToUpdates } = useFindTodos();
    const users = useFindUsers();
    const currentUser = computed(() => users.state.value.data[0]);
    const { loading, data, error } = toRefs(state.value);
    console.log({ loading, data, error, state });
    const startReplication = () => {
      datastore.startReplication();
      replicating.value = true;
    };
    onMounted(() => {
      startReplication();
      datastore.getNetworkIndicator()?.subscribe({
        next: (event: NetworkStatusEvent) => {
          if (event.isOnline) {
            startReplication();
          } else {
            datastore.stopReplication();
            replicating.value = false;
          }
        },
      });
    });
    watch(
      data,
      () => {
        const subscription = subscribeToUpdates();
        return () => subscription.unsubscribe();
      },
      { deep: true, immediate: true }
    );
    const cancelAddTodo = () => (isToAddTodoView.value = false);
    const cancelAddUser = () => (isToAddUserView.value = false);
    return {
      containerStyle,
      isToAddTodoView,
      isNotToAddView,
      loading,
      replicating,
      error,
      data,
      cancelAddTodo,
      isToAddUserView,
      cancelAddUser,
      currentUser,
    };
  },
});
</script>
