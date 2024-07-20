import { AiOutlinePlus } from "react-icons/ai";
import Box from "../Box/Box";
import { PlusIcon } from "@radix-ui/react-icons";
import styles from "./styles.module.scss";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { UploadModal } from "../UploadModal/UploadModal";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types/types";
import { MediaItem } from "../MediaItem/MediaItem";

type LibraryProps = {
  songs:Song[]
}

export const Library:React.FC<LibraryProps> = ({songs}) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

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
          <MediaItem key={item.id} onClick={()=>{}} data={item}/>
        ))}
      </div>
    </Box>
  );
};
