import { useAuth } from "../../hooks/useAuth";
import { Button, Form, Input } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";

export default function LoginForm() {
  const { login } = useAuth();
  const initialValues = {
    email: "test@email.com",
    password: "password",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await login(values.email, values.password);
        }}>
        {({
          values,
          errors,
          setFieldValue,
          handleSubmit,
          touched,
          isSubmitting,
        }) => (
          <Form className="!space-y-6">
            <div>
              <h1 className="text-center text-2xl font-bold">
                Vendor Portal Login
              </h1>
              <p className="text-center text-gray-500">
                Enter your email and password to login
              </p>
            </div>
            <Form.Item
              label="Email"
              labelCol={{ span: 24 }}
              required
              validateStatus={errors.email && touched.email ? "error" : ""}
              help={errors.email && touched.email ? errors.email : ""}>
              <Input
                placeholder="e.g. johndoe@gmail.com"
                name="email"
                onChange={(e) => setFieldValue("email", e.target.value)}
                value={values.email}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              labelCol={{ span: 24 }}
              required
              validateStatus={
                errors.password && touched.password ? "error" : ""
              }
              help={errors.password && touched.password ? errors.password : ""}>
              <Input.Password
                placeholder="Enter your password"
                name="password"
                type="password"
                onChange={(e) => setFieldValue("password", e.target.value)}
                value={values.password}
              />
            </Form.Item>
            <Button
              className="w-full"
              type="primary"
              loading={isSubmitting}
              onClick={() => handleSubmit()}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
