"use client";

import useUploadModal from "@/hooks/useUploadModal";
import * as Form from "@radix-ui/react-form";
import { FileIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import styles from "./styles.module.scss";
import useUser from "@/hooks/useUser2";
import toast from "react-hot-toast";
import uniquid from "uniqid";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const UploadModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const uploadModal = useUploadModal();
  const { data, isFetching } = useUser();
  const supabaseClient = createClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !data.id) {
        toast.error("Miss field");
        return;
      }
      const uniqueId = uniquid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }

      const { data: imageData, error: imgError } = await supabaseClient.storage
        .from("images")
        .upload(`img-${values.title}-${uniqueId}`, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (imgError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: data.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song created");
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Upload modal title"
      description="Upload modal description"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <Form.Root
        onSubmit={handleSubmit(onSubmit)}
        className={styles.FormWrapper}
      >
        <Form.Field name="title" className={styles.FormFiled}>
          <Form.Label htmlFor="title" className={styles.FormLabel}>
            Title
          </Form.Label>
          <Form.Control asChild>
            <Input
              id="title"
              disabled={isLoading}
              {...register("title", { required: true })}
              placeholder="Song title"
            />
          </Form.Control>
        </Form.Field>

        <Form.Field name="author" className={styles.FormFiled}>
          <Form.Label htmlFor="author" className={styles.FormLabel}>
            Author
          </Form.Label>
          <Form.Control asChild>
            <Input
              id="author"
              disabled={isLoading}
              {...register("author", { required: true })}
              placeholder="Song author"
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="song" className={styles.FormFiled}>
          <Form.Label htmlFor={"song"} className={styles.FileIcon}>
            <p className="">select a song file</p>
            <FileIcon />
          </Form.Label>
          <Form.Control asChild>
            <Input
              id="song"
              type="file"
              accept=".mp3"
              disabled={isLoading}
              {...register("song", { required: true })}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field name="image" className={styles.FormFiled}>
          <Form.Label htmlFor={"image"} className={styles.FileIcon}>
            <p className="">select a image file</p>
            <FileIcon />
          </Form.Label>
          <Form.Control asChild>
            <Input
              id="image"
              type="file"
              accept=".jpg"
              disabled={isLoading}
              {...register("image", { required: true })}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="Button" style={{ marginTop: 10 }}>
            Post question
          </button>
        </Form.Submit>
      </Form.Root>
    </Modal>
  );
};
