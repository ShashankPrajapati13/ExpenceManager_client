import { Fragment, useRef, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { categoryOptions } from "../../helpers";
import { createExpenseAsync } from "../../Redux/Slices/expenseSlice";
import { useDispatch } from "react-redux";

function CreatePopup({ open, setOpen }) {
  const cancelButtonRef = useRef(null);

  const dispatch = useDispatch()

  const [expenseData, setExpenseData] = useState({
    expenseName: "",
    dateOfexpense: "",
    amount: "",
    expenseDes: "",
    category: "",
  })

  const changeHandler = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value })
    // // console.log(e.target.value,e.target.name)
    // // console.log(expenseData)
  }
  const submitHandler = (e) => {
    e.preventDefault();
    // // console.log(expenseData)
    dispatch(createExpenseAsync(expenseData))
    setExpenseData({
      email: "",
      password: ""
    })
    setOpen(false);
    // // console.log(expenseData)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center  sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Create Expense
                    </Dialog.Title>
                  </div>
                  <div className="flex min-h-full flex-1 flex-col justify-center  py-5 ">
                    <form className="space-y-6" onSubmit={submitHandler}>
                      <div>
                        <label
                          htmlFor="expenseName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Expense Name
                        </label>
                        <div className="mt-2">
                          <input
                            id="expenseName"
                            name="expenseName"
                            type="text"
                            value={expenseData.expenseName}
                            onChange={changeHandler}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="dateOfexpense"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Date Of Expense
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            id="dateOfexpense"
                            name="dateOfexpense"
                            type="date"
                            autoComplete="dateOfexpense"
                            value={expenseData.dateOfexpense}
                            onChange={changeHandler}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset px-3 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            category
                          </label>
                        </div>
                        <div className="mt-2">
                          <select
                            id="countries"
                            name="category"
                            value={expenseData.category}
                            onChange={changeHandler}
                            className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option defaultValue="">Choose a category</option>
                            {categoryOptions.map((e, i) => (
                              <option key={i} value={e}>
                                {e}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="expenseDes"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Expence Description
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            id="expenseDes"
                            name="expenseDes"
                            type="text"
                            autoComplete="expenseDes"
                            value={expenseData.expenseDes}
                            onChange={changeHandler}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="amount"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Amount
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            id="amount"
                            name="amount"
                            type="Number"
                            autoComplete="amount"
                            value={expenseData.amount}
                            onChange={changeHandler}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Create Expense
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default CreatePopup;
