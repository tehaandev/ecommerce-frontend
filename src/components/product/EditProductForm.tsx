import { useProducts } from "../../hooks/useProducts";
import { EditProductFormProps } from "../../interfaces/props";
import constructImageUrl from "../../utils/constructImageUrl";
import { Button, Form, Image, Input, InputNumber, Select } from "antd";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function EditProductForm({ product }: EditProductFormProps) {
  const { editProduct } = useProducts();
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<
    {
      _id: string;
      imageUri: string;
      no: number;
    }[]
  >(
    product.images.map((image, index) => ({
      _id: image._id,
      imageUri: image.imageUri,
      no: index + 1,
    })),
  );
  const initialValues = {
    sku: product.sku,
    name: product.name,
    qty: product.qty,
    description: product.description,
    price: product.price,
    thumbnail: existingImages?.find(
      (option) => option._id === product.thumbnail,
    )?.no,
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
        const thumbnailId = existingImages?.find(
          (option) => option.no === values.thumbnail,
        )?._id as string;
        await editProduct(
          {
            ...values,
            existingImages: existingImages?.map((option) => {
              return {
                _id: option._id,
                imageUri: option.imageUri,
              };
            }),
            newImages: images,
            thumbnail: thumbnailId,
          },
          product._id,
        );
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
          <div className="my-7 space-y-3">
            <h1>Uploaded Images</h1>
            <div className="grid grid-cols-5 gap-2">
              {existingImages.map((image) => (
                <div key={image._id}>
                  <Image
                    src={constructImageUrl(image.imageUri)}
                    alt={product.name}
                    className="object-cover"
                  />
                  <div className="flex items-center justify-center">
                    <p className="text-ecommerce-gray text-center">
                      {
                        existingImages?.find(
                          (option) => option._id === image._id,
                        )?.no
                      }
                    </p>
                    <Button
                      type="text"
                      className="absolute"
                      onClick={() => {
                        setExistingImages(
                          existingImages.filter(
                            (option) => option._id !== image._id,
                          ),
                        );
                      }}>
                      <Image
                        src="/delete-icon.svg"
                        alt="Close"
                        preview={false}
                        className="object-cover"
                      />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Choose Thumbnail"
            validateStatus={
              touched.thumbnail && errors.thumbnail ? "error" : ""
            }
            help={
              touched.thumbnail && errors.thumbnail ? errors.thumbnail : ""
            }>
            <Select
              onChange={(value) => setFieldValue("thumbnail", value)}
              value={values.thumbnail}
              placeholder="Select a thumbnail">
              {existingImages?.map((option) => (
                <Select.Option key={option._id} value={option.no}>
                  {option.no}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button
            type="primary"
            size="large"
            className="float-end"
            onClick={() => handleSubmit()}>
            Save Changes
          </Button>
        </Form>
      )}
    </Formik>
  );
}
