import { useProducts } from "../../hooks/useProducts";
import { Button, Form, Input, InputNumber } from "antd";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function AddProductForm() {
  const { createProduct } = useProducts();
  const [images, setImages] = useState<File[]>([]);
  const initialValues = {
    sku: "",
    name: "",
    qty: 0,
    description: "",
    price: 0,
  };
  const validationSchema = Yup.object({
    sku: Yup.string().required("SKU is required"),
    name: Yup.string().required("Name is required"),
    qty: Yup.number().required("Quantity is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
  });
  return (
    <Formik
      onSubmit={async (values) => {
        await createProduct({ ...values, images });
      }}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      {({ values, setFieldValue, touched, errors, handleSubmit }) => (
        <Form>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              labelCol={{ span: 24 }}
              label="SKU"
              validateStatus={touched.sku && errors.sku ? "error" : ""}
              help={touched.sku && errors.sku ? errors.sku : ""}>
              <Input
                placeholder="e.g. 12345"
                value={values.sku}
                onChange={(e) => setFieldValue("sku", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Name"
              validateStatus={touched.name && errors.name ? "error" : ""}
              help={touched.name && errors.name ? errors.name : ""}>
              <Input
                placeholder="e.g. T-Shirt"
                value={values.name}
                onChange={(e) => setFieldValue("name", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Quantity"
              className="w-full"
              validateStatus={touched.qty && errors.qty ? "error" : ""}
              help={touched.qty && errors.qty ? errors.qty : ""}>
              <InputNumber
                value={values.qty}
                onChange={(value) => setFieldValue("qty", value)}
              />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Price"
              className="w-full"
              validateStatus={touched.price && errors.price ? "error" : ""}
              help={touched.price && errors.price ? errors.price : ""}>
              <InputNumber
                prefix="$"
                value={values.price}
                onChange={(value) => setFieldValue("price", value)}
              />
            </Form.Item>
          </div>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Description"
            className="col-span-2"
            validateStatus={
              touched.description && errors.description ? "error" : ""
            }
            help={
              touched.description && errors.description
                ? errors.description
                : ""
            }>
            <Input.TextArea
              placeholder="A small description about the product"
              value={values.description}
              onChange={(e) => setFieldValue("description", e.target.value)}
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Product Images"
            validateStatus={touched.price && errors.price ? "error" : ""}
            help={touched.price && errors.price ? errors.price : ""}>
            <div className="grid grid-cols-5 gap-4">
              <p className="text-ecommerce-gray text-xs">{`JPEG, PNG, SVG or GIF (Maximum file size 10MB)`}</p>
              <Input
                className="col-span-4"
                type="file"
                multiple
                onChange={(e) => {
                  setImages(Array.from(e.target.files as FileList));
                }}
              />
            </div>
          </Form.Item>
          <Button
            type="primary"
            size="large"
            className="float-end"
            onClick={() => handleSubmit()}>
            Add Product
          </Button>
        </Form>
      )}
    </Formik>
  );
}
