import { Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton, Flex, Icon, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { BiPoll } from 'react-icons/bi';
import TabItem from './TabItem';
import TextInputs from './PostForm/TextInputs';
import ImageUpload from './PostForm/ImageUpload';
import { Post } from '@/atoms/postAtom';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '@/firebase/clientApp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';


const formTabs = [
    {
        title: "Post",
        icon: IoDocumentText,
    },
    {
        title: "Images & Video",
        icon: IoImageOutline,
    },
    {
        title: "Link",
        icon: BsLink45Deg,
    },
    {
        title: "Poll",
        icon: BiPoll,
    },
    {
        title: "Talk",
        icon: BsMic,
    },
]

export type TabItem = {
    title: string;
    icon: typeof Icon.arguments;
}

type NewPostFormProps = {
    user: User;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [textInputs, setTextInputs] = useState({
        title: "",
        body: "",
    })

    const [selectedFile, setSelectedFile] = useState<string>();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);

    const handleCreatePost = async () => {

        const { communityId } = router.query;
        //new post object make this of type post 
        const newPost: Post = {
            communityId: communityId as string,
            creatorId: user.uid,
            creatorDisplayName: user.email!.split("@")[0],
            title: textInputs.title,
            body: textInputs.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp() as Timestamp,
        }
        setLoading(true);

        try {
            //store the post in our database    
            const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

            //check if user has decided to include image 
            if (selectedFile) {
                //store in storage  get download function return imageURL
                const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
                await uploadString(imageRef, selectedFile, 'data_url');
                // update post doc adding imageURL
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(postDocRef, {
                    imageURL: downloadURL,
                });
            }
            //redirect user back to community page using the router
            router.back();
        } catch (error: any) {
            console.log("handleCreatePost error", error.message);
            setError(true);
        }
        setLoading(false);


    };

    const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (event.target.files?.[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                setSelectedFile(readerEvent.target.result as string);
            }
        }
    };
    const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {
            target: { name, value },
        } = event;
        setTextInputs(prev => ({
            ...prev,
            [name]: value,
        }))
    };

    return (
        <Flex direction="column" bg="white" borderRadius={4} mt={2}>
            <Flex width="100%">
                {formTabs.map((item) => (
                    <TabItem
                        key={item.title}
                        item={item}
                        selected={item.title === selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                ))}
            </Flex>
            <Flex p={4}>
                {selectedTab === "Post" && (
                    <TextInputs
                        textInputs={textInputs}
                        handleCreatePost={handleCreatePost}
                        onChange={onTextChange}
                        loading={loading}
                    />)
                }
                {selectedTab === "Images & Video" &&
                    <ImageUpload
                        selectedFile={selectedFile}
                        onSelectImage={onSelectImage}
                        setSelectedTab={setSelectedTab}
                        setSelectedFile={setSelectedFile}
                    />
                }
            </Flex>
            {error
                && (
                    <Alert status="error">
                        <AlertIcon />
                        <Text mr={2}>Error creating post</Text>
                    </Alert>
                )}
        </Flex>
    )
}
export default NewPostForm;