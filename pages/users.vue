<template>
  <div class="flex">
    <div class="m-auto pl-44 pt-5">
      <div class="flex justify-end">
        <h2 class="px-8 py-4 text-black">ADD NEW</h2>
        <el-tooltip content="Add New" :open-delay="300" placement="top">
          <button @click="openForm" class="button-with-tooltip add mb-2">
            <svg
              class="h-6 w-6 my-2 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </button>
        </el-tooltip>
      </div>
      <div v-if="isOpen" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeForm">&times;</span>
          <!-- Your form goes here -->
          <UserForm />
        </div>
      </div>
      <div v-if="updateForm" class="updateModal">
        <div class="update-modal t-40">
          <span class="closeIt" @click="closeIt">&times;</span>
          <!-- Your form goes here -->
          <UpdateUserForm
            :userId="selectedUserId"
            @user-updated="handleUserUpdated"
          />
        </div>
      </div>
      <el-table :data="tableData" class="w-full">
        <el-table-column
          min-width="50"
          type="index"
          prop="Id"
          class="text-center"
        ></el-table-column>
        <el-table-column
          min-width="150"
          prop="Name"
          label="User Name"
        ></el-table-column>
        <el-table-column
          min-width="200"
          prop="Surname"
          label="Surname"
        ></el-table-column>
        <el-table-column
          min-width="200"
          prop="Email"
          label="User Mail"
        ></el-table-column>
        <el-table-column
          min-width="150"
          prop="CreateAt"
          label="Create Date"
        ></el-table-column>
        <el-table-column min-width="150" label="Actions" header-align="right">
          <template #default="{ row }">
            <div class="flex justify-end items-center">
              <el-tooltip content="Info" :open-delay="300" placement="top">
                <button
                  type="info"
                  size="sm"
                  icon
                  class="mr-2 .button-with-tooltip"
                >
                  <i class="tim-icons icon-single-02"></i>
                </button>
              </el-tooltip>

              <el-tooltip content="Update" :open-delay="300" placement="top">
                <button @click="formUpdate(row.Id)" class="button-with-tooltip">
                  <svg
                    class="h-4 w-4 text-white"
                    width="24"
                    height="12"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    />
                    <path
                      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    />
                  </svg>
                </button>
              </el-tooltip>

              <el-tooltip content="Delete">
                <button
                  @click="confirmAndDeleteUser(row.Id)"
                  class="button-with-tooltip delete"
                >
                  <svg
                    class="h-4 w-4 text-white"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
                    />
                    <line x1="18" y1="9" x2="12" y2="15" />
                    <line x1="12" y1="9" x2="18" y2="15" />
                  </svg>
                </button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ElTable, ElTableColumn } from "element-plus";
import tippy from "tippy.js";

export default {
  components: {
    ElTable,
    ElTableColumn,
  },
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.fetchUserData();
  },
  setup() {
    const isOpen = ref(false);
    const updateForm = ref(false);
    const selectedUserId = ref(null);
    const openForm = () => {
      isOpen.value = true;
    };
    const closeForm = () => {
      isOpen.value = false;
    };
    const formUpdate = (id) => {
      updateForm.value = true;
      selectedUserId.value = id;
    };
    const closeIt = () => {
      updateForm.value = false;
      selectedUserId.value = null;
    };
    return {
      isOpen,
      updateForm,
      openForm,
      closeForm,
      formUpdate,
      closeIt,
      selectedUserId,
    };
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        this.tableData = data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    async deleteUser(id) {
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        // Remove the deleted user from the tableData array
        this.tableData = this.tableData.filter((user) => user.Id !== id);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
    async confirmAndDeleteUser(id) {
      const confirmed = await this.confirmation(
        "Confirm Deletion",
        "Are you sure you want to delete this user?"
      );
      if (confirmed) {
        await this.deleteUser(id);
      }
    },
    confirmation(title, message) {
      return new Promise((resolve) => {
        if (confirm(`${title}\n\n${message}`)) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    },
    handleUserUpdated() {
      this.fetchUserData();
      this.closeIt();
    },
    initializeTooltips() {
      // Initialize tooltips for buttons
      tippy(".button-with-tooltip", {
        content: "Tooltip content", // Change this to the content you want
        placement: "top", // Change the placement as needed
        delay: 300, // Adjust the delay if necessary
      });
    },
  },
};
</script>

<style scoped>
.button-with-tooltip {
  @apply bg-blue-500 text-white px-4 py-2 rounded-md shadow-md;
  margin: 5px;
  /* Add any other Tailwind CSS classes for styling */
}
.edit {
  background-color: green;
  color: white;
}
.delete {
  background-color: red;
  color: white;
}
.add {
  background-color: transparent;
  color: black;
}
</style>
