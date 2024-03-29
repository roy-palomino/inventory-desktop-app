import { createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import Store from "../store";

import { Form } from "solid-js-form";
import * as Yup from "yup";

import ButtonComponent from "../components/common/button";
import { User } from "../types";

export default function Login() {
  const [store, setStore] = Store;

  const [state, setState] = createStore({
    loading: false,
  });

  // const [state, setState] = createSignal({
  //   loading: false,
  // });
  
  const dumpUser: User = {
    id: 1,
    username: "aoeusnth",
    password: "aoeusnth",
    first_name: "roier",
    last_name: "palomino",
    email: "aoeusnth@mail.com",
  };

  async function performLogin() {
    setState("loading", true);
    setTimeout(() => {
      setState("loading", false);
      setStore("user", dumpUser);
      localStorage.setItem("user", JSON.stringify(dumpUser));
      console.log(JSON.parse(localStorage.getItem("user")));
      console.log( store.user);
    }, 2000);
  }

  // TODO: Change the form validation messages to custom messages

  return (
    <div class="w-screen h-screen bg-gradient-to-b from-cyan-400 to-emerald-500 flex justify-center items-center">
      <div class="w-11/12 p-8 m-auto bg-white rounded-lg sm:w-96 bg-opacity-80 bg-clip-padding">
        <Form
          initialValues={{ username: "", password: "" }}
          validation={{
            username: Yup.string().required(),
            password: Yup.string().required(),
          }}
          onSubmit={async (form) => {
            await performLogin();
            console.log(form.values);
          }}
        >
          {(form) => {
            //@ts-ignore
            const formHandler = form.formHandler;
            const usernameError = createMemo(() =>
              form.errors.username && form.touched.username
                ? form.errors.username
                : ""
            );
            const passwordError = createMemo(() =>
              form.errors.password && form.touched.password
                ? form.errors.password
                : ""
            );
            return (
              <div class="flex flex-col">
                <div>
                  <h1 class="text-2xl font-medium text-center md:text-4xl font-roboto mb-8">
                    Iniciar sesión
                  </h1>
                </div>
                <div class="h-16">
                  <div class="relative flex items-center">
                    <svg
                      class="absolute w-5 h-5 ml-3 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <input
                      class="form-input placeholder:text-slate-400"
                      value={form.values.username}
                      type="email"
                      name="username"
                      placeholder="Email"
                      autofocus
                      //@ts-ignore
                      use:formHandler
                    />
                  </div>
                  <p class="error-form-message">{usernameError()}</p>
                </div>
                <div class="h-16 mt-2">
                  <div class="relative flex items-center">
                    <svg
                      class="absolute w-5 h-5 ml-3 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <input
                      class="form-input placeholder:text-slate-400"
                      value={form.values.password}
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      //@ts-ignore
                      use:formHandler
                    />
                  </div>
                  <p class="error-form-message">{passwordError()}</p>
                </div>
                <ButtonComponent
                  class="btn-primary"
                  loading={state.loading}
                  loadingText="Espere"
                  onClick={performLogin()}
                >
                  Iniciar sesión
                </ButtonComponent>
              </div>
            );
          }}
        </Form>
      </div>
    </div>
  );
}
