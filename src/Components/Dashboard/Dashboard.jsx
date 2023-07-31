import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Disclosure, Menu, Transition, Dialog } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@mui/material/Button";
import CustomTable from "../Table/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DEMO_DATA from "../Table/SAMPLE_DATA";
import DeletePopup from "../Popups/DeletePopup";
import EditPopup from "../Popups/EditPopup";
import CreatePopup from "../Popups/CreatePopup";
import Logo from "../../Assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutAsync, logout } from "../../Redux/Slices/userSlice";
import { allUserExpenseAsync } from "../../Redux/Slices/expenseSlice";
import { serialize } from "../../helpers";
import moment from "moment-timezone";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [{ name: "Dashboard", href: "#", current: true }];
const userNavigation = [
  { name: "Your Profile", func:""},
  { name: "Sign out", func:"logoutHandler" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Dashboard() {
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editDets, setEditDets] = useState(null)
  const columns = [
    { field: "expenseName", headerName: "Name", type: "string", width: 150 },
    { field: "category", headerName: "Category", type: "string", width: 150 },
    { field: "dateOfexpense", headerName: "Date Of Expense", type: "string", width: 150,valueGetter: (params) => moment.tz(params.row.dateOfexpense, "Asia/Bangkok").format("DD MMM, YYYY") },
    { field: "amount", headerName: "Amount", type: "string", width: 150 },
    { field: "expenseDes", headerName: "Expence Des.", type: "string", width: 150 },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 150,
       valueGetter: (params) => moment(params.row.updateAt).fromNow()
         
    },
    {
      field: "createdAt",
      headerName: "Created At",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,

      valueGetter: (params) => moment.tz(params.row.createdAt, "Asia/Bangkok").format("DD MMM, YYYY")
      
    },
    {
      field: "user",
      headerName: "Created By",
      width: 150,
      valueGetter: (props) =>{
        // console.log(props.row.user._id,data.user.user.user._id)
       return props?.row?.user?._id== data?.user?.user?.user?._id ? 'me':props?.row?.user?.email
      }
      
      
    },
    {
      field: "actions",
      headerName: "Edit",
      type: "",

      renderCell: (props) => (
        <EditIcon
          onClick={() => {
            setShowEdit(true);
            setEditId(props?.row?.id);
            setEditDets(props.row)
          }}
          className="edit-icon"
        />
        
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      type: "",

      renderCell: (props) => (
        <DeleteIcon
          onClick={() => {
            setShowDelete(true);
            setDeleteId(props?.row?.id);
          }}
          className="delete-icon"
        />
      ),
    },
  ];

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const data = useSelector(e=>e)

  // console.log(data.expense.allExpense)
  

  let AllExpenceData = data.expense.allExpense

  useEffect(() => {
        if(data.user.isAuthenticate){
           navigate('/dashboard')
           dispatch(allUserExpenseAsync())
        }
        else navigate('/') 
    }, [data.user.isAuthenticate,data.expense.expense])

  const logoutHandler = ()=>{
    dispatch(logOutAsync())
  }

  const tableData = useMemo(() => serialize(AllExpenceData), [AllExpenceData]);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-8 w-8" src={Logo} alt="Your Company" />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <button
                            
                            onClick={item.func}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  
                              <Menu.Item >
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Your Profile
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item >
                                {({ active }) => (
                                  <button
                                    onClick={logoutHandler}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    sign Out
                                  </button>
                                )}
                              </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 ">
              Expense Manager
            </h1>
            <Button variant="contained" onClick={() => setShowCreate(true)}>
              Add Expense
            </Button>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <CustomTable columns={columns} data={tableData} />
          </div>
        </main>
      </div>
      {showCreate ? (
        <CreatePopup open={showCreate} setOpen={setShowCreate} />
      ) : null}
      {showDelete ? (
        <DeletePopup open={showDelete} setOpen={setShowDelete} id={deleteId} />
      ) : null}
      {showEdit ? <EditPopup open={showEdit} setOpen={setShowEdit} dets={editDets}  /> : null}
    </>
  );
}

export default Dashboard;
