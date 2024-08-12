import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types/types";
import { PlusIcon } from "@radix-ui/react-icons";
import Box from "../Box/Box";
import { MediaItem } from "../MediaItem/MediaItem";
import styles from "./styles.module.scss";
import useOnPlay from "@/hooks/useOnPlay";

type LibraryProps = {
  songs:Song[]
}

export const Library:React.FC<LibraryProps> = ({songs}) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <Box className={styles.PlayList}>
      <div className={styles.playListHeader} onClick={onClick}>
        <p className={styles.PlayListParagraph}>my PlayList</p>
        <PlusIcon
          className={styles.PlayListAddButton}
        ></PlusIcon>
      </div>
      <div className={styles.mediaList}>
        {songs.map((item)=>(
          <MediaItem key={item.id} onClick={(id:string)=>onPlay(id)} data={item}/>
        ))}
      </div>
    </Box>
  );
};
