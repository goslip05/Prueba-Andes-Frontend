import { useEffect, useState } from "react";
import { useFunctions } from "../../../hooks/useFunctions.js";

//components primereact
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaShare, FaTrashAlt } from "react-icons/fa";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Tag } from "primereact/tag";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Skeleton } from "primereact/skeleton";
import { MdAddCircle } from "react-icons/md";
import AsyncSelect from "react-select/async";

//sweetalert2
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

//configuración de la api
import { getListTaskApi, postDeleteTaskApi } from "../../../api/task.js";

//visualizacion de color dependiendo del estado
import { getColorEstadoTask } from "../../../helpers/index.js";

export default function ListTask() {
  const { updateTitlePage } = useFunctions();

  //actualizar titulo pagina
  updateTitlePage("Tareas");

  const [loadingData, setLoadingData] = useState(true);
  const [selectTask, setSelectTask] = useState(null);
  const [listTask, setListTask] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [menuPortalTarget, setMenuPortalTarget] = useState(null);
  const [title, setTitle] = useState(null);
  const [estadoInterno, setEstadoInterno] = useState(null);
  const [opcionesEstado, setOpcionesEstado] = useState([
    { value: "pendiente", label: "Pendiente" },
    { value: "en progreso", label: "En Progreso" },
    { value: "completada", label: "Completado" },
  ]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    title: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    description: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    due_date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    status: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  });

  //context del modal swall
  const MySwal = withReactContent(Swal);

  //select de estato
  const loadOptionsEstado = (inputValue, callback) => {
    setTimeout(() => {
      const filteredOptions = filterEstado(inputValue);
      callback(filteredOptions);
    }, 1000);
  };
  const filterEstado = (inputValue) => {
    return opcionesEstado.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  const handleChangeOpcionesEstado = (selectedOption) => {
    //Verifica si selectedOption es null o undefined antes de acceder a .value
    const selectedValue = selectedOption ? selectedOption.value : null;
    setEstadoInterno(selectedValue);
  };

  const obtenerlistTask = async (id) => {
    try {
      if (id === 1) {
        setLoadingData(true);
        MySwal.fire({
          icon: "info",
          title: "¡Cargando Información!",
          text: "Espera por favor...",
          timerProgressBar: true,
          allowOutsideClick: false, //false
          didOpen: () => {
            MySwal.showLoading();
          },
        });
      }
      const responseApi = await getListTaskApi(title,estadoInterno);

      if (responseApi.data) {
        setListTask(responseApi.data);
      } else {
        setListTask([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Independientemente del resultado de la API, se cierra el SweetAlert y actualizar el estado de loadingData
      MySwal.close();
      setLoadingData(false);
    }
  };

  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-between">
        <div>
          <Button
            type="button"
            size="small"
            className="btn-primary btn-md rounded me-2"
            icon="pi pi-filter-slash"
            label="Limpiar"
            onClick={clearFilter}
          />
          {/* <Button type="button" icon="pi pi-file-excel" size="small" className="rounded" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" /> */}
        </div>
        <div className="flex-shrink-1">
          <span className="p-input-icon-left pr-4">
            <InputText
              className="p-inputtext-sm"
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="¿Que deseas buscar?"
            />
          </span>
          <Button
            type="button"
            size="small"
            icon="pi pi-refresh"
            rounded
            severity="success"
            className="rounded"
            onClick={reloadData}
          ></Button>
        </div>
      </div>
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      id: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      title: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      description: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      due_date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      status: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
    });
    setGlobalFilterValue("");
  };

  const clearFilter = () => {
    initFilters();
  };

  const footer = `En total existen ${
    listTask ? listTask.length : 0
  } Productos.`;

  const reloadData = () => {
    obtenerlistTask();
  };

  const customAQctions = (rowData) => {
    let actions;
    actions = (
      <div className="btn-group" role="group" aria-label="Basic example">
        <Link
          to={`/panel/tareas/editar/${rowData.id}`}
          className="btn btn-info btn-sm"
        >
          <FaEdit />
        </Link>
        <a type="button" className="btn btn-danger btn-sm">
          <i
            className="fa fa-trash"
            onClick={() => deleteTask(rowData.id)}
            aria-hidden="true"
          ></i>
        </a>
      </div>
    );

    return actions;
  };

  // Manejar la acción de actualizar
  const deleteTask = async (taskId) => {
    MySwal.fire({
      title: "¿Confirmas la eliminación de la Tarea?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          MySwal.fire({
            icon: "info",
            title: "¡Procesando!",
            text: "Espera por favor...",
            timerProgressBar: true,
            allowOutsideClick: false, //false
            didOpen: () => {
              MySwal.showLoading();
            },
          });

          const responseApi = await postDeleteTaskApi(taskId);
          if (responseApi.status == 200) {
            console.log(responseApi.status);
            MySwal.fire({
              icon: "success",
              text: "Tarea eliminada",
              showConfirmButton: false,
              allowOutsideClick: true,
              didOpen: () => {
                MySwal.showLoading();
              },
            });
            //Actualizar la data de tabla
            reloadData();
          } else {
            MySwal.fire({
              icon: "error",
              title: "Ops!",
              html: responseApi.info,
              confirmButtonColor: "#EF4444",
              confirmButtonText: "Entendido",
              allowOutsideClick: false,
            });
          }
          MySwal.close();
        } catch (error) {
          console.log(error);
          MySwal.fire({
            icon: "error",
            title: "Ops!",
            html: error,
            confirmButtonColor: "#EF4444",
            confirmButtonText: "Entendido",
            allowOutsideClick: false,
          });
        }
      }
    });
  };

  const customTagEstado = (rowData) => {
    const upper = rowData.status;
    const valueStatus = upper.toUpperCase();
    return (
      <Tag
        value={valueStatus}
        severity={getColorEstadoTask(rowData.status)}
      ></Tag>
    );
  };

  const onRowSelect = (event) => {};

  //iniciar
  useEffect(() => {
    obtenerlistTask(0);
  }, [ title, estadoInterno,]);
  return (
    <div>
      <div className="p-3">
        <h5 className="mb-4 text-gray-800">Listado de tareas</h5>
        <Accordion activeIndex={0} className="mb-4">
          <AccordionTab header="Filtros" >
            <div className="row ">
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    <small className="font-bold block mb-2">TITULO</small>
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    name="title"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="mb-3">
                  <label className="form-label">
                    <small className="font-bold block mb-2">ESTADO</small>
                  </label>
                  <AsyncSelect
                    className="w-full select-custom"
                    placeholder="- Seleccione estado -"
                    noOptionsMessage={() => "No se encontro ningun resultado!"}
                    isClearable={true}
                    cacheOptions
                    defaultOptions={opcionesEstado}
                    loadOptions={loadOptionsEstado}
                    onChange={handleChangeOpcionesEstado}
                    menuPortalTarget={menuPortalTarget}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-md-3 align-self-center d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={() => obtenerlistTask(1)}
                >
                  Buscar
                </button>
              </div>
            </div>
          </AccordionTab>
        </Accordion>
        <div className="row mb-4">
          <div className="col-md-12 d-flex justify-content-start  fw-bold">
            <Link to={`/panel/tareas/crear`} className="btn btn-success btn-md">
              <div className="d-flex align-items-center px-3">
                <span className="fw-bold mr-2 mb-1">
                  <MdAddCircle />
                </span>
                <span class="fw-bold">Crear Tarea</span>
              </div>
            </Link>
          </div>
        </div>

        {loadingData ? ( // Si loadingData es true, mostrar Skeleton
          <DataTable
            value={Array.from({ length: 5 })}
            emptyMessage="No se encontraron tareas."
            size="small"
            stripedRows
            removableSort
            paginator
            rows={50}
            rowsPerPageOptions={[50, 100, 150, 200]}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} a {last} de {totalRecords}"
            scrollable
            scrollHeight="380px"
            sortField="hola"
            sortOrder={-1}
            header={renderHeader}
            paginatorLeft={footer}
            filters={filters}
            tableStyle={{ minWidth: "80rem" }}
            className="mb-4"
          >
            <Column
              header="Id"
              sortable
              style={{ width: "4%" }}
              body={<Skeleton />}
            ></Column>
            <Column header="Titulo" sortable body={<Skeleton />}></Column>
            <Column header="Descripción" sortable body={<Skeleton />}></Column>
            <Column
              header="Fecha finalización"
              sortable
              body={<Skeleton />}
            ></Column>
            <Column header="Estado" sortable body={<Skeleton />}></Column>
          </DataTable>
        ) : (
          <DataTable
            value={listTask}
            emptyMessage="No se encontraron tareas."
            size="small"
            stripedRows
            removableSort
            paginator
            rows={50}
            rowsPerPageOptions={[50, 100, 150, 200]}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} a {last} de {totalRecords}"
            scrollable
            scrollHeight="380px"
            sortField="id"
            sortOrder={-1}
            dataKey="id"
            header={renderHeader}
            paginatorLeft={footer}
            filters={filters}
            tableStyle={{ minWidth: "80rem" }}
            className="mb-4"
            selectionMode="single"
            selection={selectTask}
            onSelectionChange={(e) => setSelectTask(e.value)}
            onRowSelect={onRowSelect}
            metaKeySelection={false}
          >
            <Column
              field="id"
              header="Id"
              body={(rowData) => rowData.id}
              sortable
              style={{ width: "4rem" }}
            ></Column>
            <Column
              field="title"
              header="Titulo"
              body={(rowData) => rowData.title}
              sortable
            ></Column>
            <Column
              field="description"
              header="Descripción"
              body={(rowData) => rowData.description}
              sortable
            ></Column>
            <Column
              field="due_date"
              header="Fecha finalización"
              body={(rowData) => rowData.due_date}
              sortable
            ></Column>
            <Column
              field="status"
              header="Estado"
              body={customTagEstado}
              sortable
            ></Column>
            <Column
              header="Acciones"
              exportable={false}
              body={customAQctions}
              style={{ width: "9%" }}
            ></Column>
          </DataTable>
        )}
      </div>
    </div>
  );
}
