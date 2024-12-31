import {ref} from "vue";
import {i18n} from "boot/i18n";
import {useQuasar} from "quasar";
import { api } from "boot/axios";

import _ from "lodash";
import {useRoute, useRouter} from "vue-router";

export default function useCommonStore(apiUrl) {
  const serverPagination = ref({
    page: 1,
    rowsNumber: 0,
    sortBy: "id",
    descending: true,
    rowsPerPage: 25,
    total_page: 1,
  });
  const router = useRouter();
  const route = useRoute();

  const filters = ref({});
  const loading = ref(false);
  const all = ref([]);
  const selected = ref([]);
  const model = ref("");
  const {t} = i18n.global;
  const q = useQuasar();
  const formRef = ref(null);
  const formDialog = ref(false);
  const formData = ref({});
  const detailData = ref({});
  const detailDialog = ref(false);
  const filterDialog = ref(false);
  const errors = ref({});
  const importFile = ref({});
  const importDialog = ref(false);


  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  const store = () => {
    loading.value = true;
    return new Promise((resolve, reject) => {
      api
        .post(`/api/` + apiUrl, formData.value, config)
        .then((response) => {
          loading.value = false;
          resolve(response);
        })
        .catch((error) => {
          loading.value = false;
          reject(error);
        });
    });
  };
  const update = () => {
    loading.value = true;
    return new Promise((resolve, reject) => {
      api
        .post(`/api/${apiUrl}/${formData.value.id}`, formData.value, config)
        .then((response) => {
          loading.value = false;
          resolve(response);
        })
        .catch((error) => {
          loading.value = false;
          reject(error);
        });
    });
  };
  const remove = () => {
    loading.value = true;
    return new Promise((resolve, reject) => {
      const items = _.map(selected.value, (item) => {
        return item;
      });
      api
        .post(`/api/${apiUrl}/delete`, {
          delete_rows: items,
        })
        .then((response) => {
          loading.value = false;
          resolve(response);
        })
        .catch((error) => {
          loading.value = false;
          reject(error);
        });
    });
  };
  const fetchPaged = () => {
    loading.value = true;
    api
      .get(`/api/` + apiUrl, {
        params: {
          ...serverPagination.value,
          filters: JSON.stringify(filters.value),
        },
      })
      .then((response) => {
        loading.value = false;
        all.value = response.data.data;
        if (response.data.meta) {
          if (response.data.meta.total) {
            serverPagination.value.rowsNumber = response.data.meta.total;
            serverPagination.value.total_page = response.data.meta.last_page;
          }
        }
      })
      .catch((error) => {
        all.value = [];
        serverPagination.value.rowsNumber = 0;
      })
      .finally(() => {
        loading.value = false;
      });
  };
  const toggleStatus = async (id) => {
    const res = await api.put(`/api/${apiUrl}/${id}/change-status`);
    if (res.status === 200) {
      q.notify({
        message: "Status changed successfully.",
        color: "positive",
        icon: "check",
        position: "top",
        timeout: 1000,
      });
      fetchPaged();
    } else {
      q.notify({
        message: "Oops! Something went wrong.",
        color: "negative",
        icon: "warning",
        position: "top",
        timeout: 1000,
      });
    }
  };
  const onRequest = ({pagination}) => {
    serverPagination.value = pagination;
    fetchPaged();
  };

  const getAll = async () => {
    try {
// loading.value = true;
      const payloadString = JSON.stringify(filters.value);
      const response = await api.get(`/api/${apiUrl}/all?filters=${payloadString}`);
      const res = response.data;
      all.value = res.data;
    } catch (error) {
    } finally {
// loading.value = false;
    }
  };

  const fetchDataById = async (id) => {
    loading.value = true;
    const res = await api.get(`/api/${apiUrl}/${id}`);
    formData.value = Object.assign({}, res.data.data);
    detailData.value = Object.assign({}, res.data.data);
    loading.value = false;
  };

  function createFunction() {
    formDialog.value = true;
    formData.value = {};
    errors.value = {};
  }

  function clearFunction() {
    filters.value = {};
    fetchPaged();
  }

  function closeFunction() {
    const redirect_page = formData.value?.redirect_page;
    const redirect = formData.value?.redirect;

    if (route.path.includes('dynamic-values')) {
      formData.value = {
        name: formData.value?.name,
        payload: {}
      }
    } else {
      formData.value = {};
    }

    errors.value = {};
    formDialog.value = false;

    if (redirect) {
      router.push({name: redirect_page});
    }
  }

  const edit = (item) => {
    formData.value = Object.assign({}, item);
    formDialog.value = true;
  };
  const submitFormData = () => {
    console.log("validation: ", formRef.value.validate());
    formRef.value.validate().then((success) => {
      if (success) {
        loading.value = true;

        if (formData.value.id) {
          update()
            .then((res) => {
              closeFunction();
              q.notify({
                message: t("message.updated"),
                timeout: 3000,
                color: "positive",
              });
              fetchPaged();
            })
            .catch((err) => {
              errors.value = err.response.data.errors;
            })
            .finally(() => loading.value = false);
        } else {
          store()
            .then((res) => {
              closeFunction();
              q.notify({
                message: t("message.created"),
                timeout: 3000,
                color: "positive",
              });
              fetchPaged();
            })
            .catch((err) => {
              errors.value = err.response.data.errors;
            })
            .finally(() => loading.value = false);
        }
      } else {
        q.notify({
          message: t("message.missing_required_fields"),
          type: 'warning',
          timeout: 3000,
        });
      }
    });
  };
  const confirmDelete = (item) => {
    q.dialog({
      title: t("label.confirm"),
      ok: t("button.ok"),
      cancel: t("button.cancel"),
      message: t("message.delete_title"),
// cancel: true,
      persistent: true,
    })
      .onOk(() => {
        selected.value.push(item);
        remove()
          .then((res) => {
            selected.value = [];
            q.notify({
              message: t("message.deleted"),
              timeout: 3000,
              color: "positive",
            });
            fetchPaged();
          })
          .catch((err) => {
            errors.value = err.response.data.errors;
          });
      })
      .onCancel(() => {
        console.log(">>>> Cancel");
      });
  };

  const buildFormData = (formData, data, parentKey) => {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;
      formData.append(parentKey, value);
    }
  };

  const jsonToFormData = (data) => {
    const formData = new FormData();
    buildFormData(formData, data);
    return formData;
  };

  const exportFunction = async () => {
    loading.value = true;
    try {
      const response = await api.post(`/api/${apiUrl}/export`, {
        ...serverPagination.value,
        filters: JSON.stringify(filters.value),
      });

      const url = response.data.url || (response.data.data && response.data.data.url);

      if (url) {
        window.open(url, '_blank');
      }

      return response;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };
  const importFunction = async () => {
    loading.value = true;
    try {

      const response = await api.post(`/api/${apiUrl}/import`,
        {
          file: importFile.value
        }, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      console.log(response.data)

      if (response.data.code === 200) {
        q.notify({
          message: "Import Successful",
          timeout: 3000,
          color: "positive",
        });
        importDialog.value = false;
        importFile.value = "";
      } else {
        q.notify({
          message: "Error while Import data",
          timeout: 3000,
          color: "negative",
        });
      }
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };
  const closeImportForm = () => {
    importDialog.value = false
  }
  const closeFilterDialog = () => {
    filterDialog.value = false
  }

  return {
    config,
    serverPagination,
    filters,
    loading,
    all,
    t,
    q,
    formRef,
    formDialog,
    formData,
    detailData,
    detailDialog,
    errors,
    selected,
    filterDialog,
    importFile,
    importDialog,
    getAll,
    fetchDataById,
    onRequest,
    store,
    fetchPaged,
    update,
    remove,
    createFunction,
    closeFunction,
    edit,
    submitFormData,
    confirmDelete,
    clearFunction,
    toggleStatus,
    buildFormData,
    jsonToFormData,
    exportFunction,
    importFunction,
    closeImportForm,
    closeFilterDialog,
  };
}
