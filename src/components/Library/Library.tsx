"use client"
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import useUser from "@/hooks/useUser2";
import { Song } from "@/types/types";
import { PlusIcon } from "@radix-ui/react-icons";
import { MediaItem } from "../MediaItem/MediaItem";
import styles from "./styles.module.scss";
import useOnPlay from "@/hooks/useOnPlay";
import { Box } from "@radix-ui/themes";

type LibraryProps = {
  songs:Song[]
}

export const Library:React.FC<LibraryProps> = ({songs}) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user, isFetching } = useUser();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user.id) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <Box className={styles.PlayList}>
      <Box className={styles.playListHeader} onClick={onClick}>
        <p className={styles.PlayListParagraph}>my PlayList</p>
        <PlusIcon
          className={styles.PlayListAddButton}
        ></PlusIcon>
      </Box>
      <div className={styles.mediaList}>
        {songs.map((item)=>(
          <MediaItem key={item.id} onClick={(id:string)=>onPlay(id)} data={item}/>
        ))}
      </div>
    </Box>
  );
};
