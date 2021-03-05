import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  pod?: Maybe<Pod>;
  story?: Maybe<Story>;
  task?: Maybe<Task>;
  messages: PaginatedMessages;
};


export type QueryPodArgs = {
  podId: Scalars['Int'];
};


export type QueryStoryArgs = {
  storyId: Scalars['Int'];
};


export type QueryTaskArgs = {
  taskId: Scalars['Int'];
};


export type QueryMessagesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  podId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  sentInvites: Array<Invite>;
  receivedInvites: Array<Invite>;
  pods: Array<Pod>;
};

export type Invite = {
  __typename?: 'Invite';
  createdAt: Scalars['String'];
  asAdmin: Scalars['Boolean'];
  inviter: User;
  invitee: User;
  pod: Pod;
};

export type Pod = {
  __typename?: 'Pod';
  id: Scalars['Int'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  members: Array<User>;
  admins: Array<User>;
  isAdmin: Scalars['Boolean'];
  stories: Array<Story>;
  messages: Array<Message>;
};

export type Story = {
  __typename?: 'Story';
  id: Scalars['Int'];
  title: Scalars['String'];
  rank: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  tasks: Array<Task>;
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['Int'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  rank: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  text: Scalars['String'];
  user: User;
  pod: Pod;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages';
  result: Array<Message>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  createPod: PodResponse;
  inviteToPod: InviteResponse;
  uninviteToPod: Scalars['Boolean'];
  cancelInvite: Scalars['Boolean'];
  removeFromPod: Scalars['Boolean'];
  leavePod: Scalars['Boolean'];
  joinPod: Scalars['Boolean'];
  deletePod: Scalars['Boolean'];
  moveStory: Scalars['Boolean'];
  createStory: StoryResponse;
  deleteStory: Scalars['Boolean'];
  moveTask: Scalars['Boolean'];
  createTask: TaskResponse;
  assignUserToTask: Scalars['Boolean'];
  removeUserFromTask: Scalars['Boolean'];
  deleteTask: Scalars['Boolean'];
  createMessage: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  data: UserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreatePodArgs = {
  name: Scalars['String'];
};


export type MutationInviteToPodArgs = {
  asAdmin: Scalars['Boolean'];
  username: Scalars['String'];
  podId: Scalars['Int'];
};


export type MutationUninviteToPodArgs = {
  username: Scalars['String'];
  podId: Scalars['Int'];
};


export type MutationCancelInviteArgs = {
  podId: Scalars['Int'];
};


export type MutationRemoveFromPodArgs = {
  userId: Scalars['Int'];
  podId: Scalars['Int'];
};


export type MutationLeavePodArgs = {
  podId: Scalars['Int'];
};


export type MutationJoinPodArgs = {
  podId: Scalars['Int'];
};


export type MutationDeletePodArgs = {
  podId: Scalars['Int'];
};


export type MutationMoveStoryArgs = {
  destinationIndex: Scalars['Int'];
  sourceIndex: Scalars['Int'];
  storyId: Scalars['Int'];
};


export type MutationCreateStoryArgs = {
  podId: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationDeleteStoryArgs = {
  storyId: Scalars['Int'];
};


export type MutationMoveTaskArgs = {
  destinationStoryId: Scalars['Int'];
  sourceStoryId: Scalars['Int'];
  destinationIndex: Scalars['Int'];
  sourceIndex: Scalars['Int'];
  taskId: Scalars['Int'];
};


export type MutationCreateTaskArgs = {
  description: Scalars['String'];
  title: Scalars['String'];
  storyId: Scalars['Int'];
};


export type MutationAssignUserToTaskArgs = {
  userId: Scalars['Int'];
  taskId: Scalars['Int'];
};


export type MutationRemoveUserFromTaskArgs = {
  userId: Scalars['Int'];
  taskId: Scalars['Int'];
};


export type MutationDeleteTaskArgs = {
  taskId: Scalars['Int'];
};


export type MutationCreateMessageArgs = {
  podId: Scalars['Int'];
  text: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type PodResponse = {
  __typename?: 'PodResponse';
  errors?: Maybe<Array<FieldError>>;
  pod?: Maybe<Pod>;
};

export type InviteResponse = {
  __typename?: 'InviteResponse';
  errors?: Maybe<Array<FieldError>>;
  invite?: Maybe<Invite>;
};

export type StoryResponse = {
  __typename?: 'StoryResponse';
  errors?: Maybe<Array<FieldError>>;
  story?: Maybe<Story>;
};

export type TaskResponse = {
  __typename?: 'TaskResponse';
  errors?: Maybe<Array<FieldError>>;
  task?: Maybe<Task>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessages?: Maybe<Message>;
};


export type SubscriptionNewMessagesArgs = {
  podId: Scalars['Int'];
};

export type CreateMessageMutationVariables = Exact<{
  text: Scalars['String'];
  podId: Scalars['Int'];
}>;


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createMessage'>
);

export type CancelInviteMutationVariables = Exact<{
  podId: Scalars['Int'];
}>;


export type CancelInviteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'cancelInvite'>
);

export type CreatePodMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreatePodMutation = (
  { __typename?: 'Mutation' }
  & { createPod: (
    { __typename?: 'PodResponse' }
    & { pod?: Maybe<(
      { __typename?: 'Pod' }
      & Pick<Pod, 'id' | 'name'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type DeletePodMutationVariables = Exact<{
  podId: Scalars['Int'];
}>;


export type DeletePodMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePod'>
);

export type InviteToPodMutationVariables = Exact<{
  username: Scalars['String'];
  podId: Scalars['Int'];
  asAdmin: Scalars['Boolean'];
}>;


export type InviteToPodMutation = (
  { __typename?: 'Mutation' }
  & { inviteToPod: (
    { __typename?: 'InviteResponse' }
    & { invite?: Maybe<(
      { __typename?: 'Invite' }
      & Pick<Invite, 'asAdmin' | 'createdAt'>
      & { invitee: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ), pod: (
        { __typename?: 'Pod' }
        & Pick<Pod, 'id' | 'name'>
      ) }
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type JoinPodMutationVariables = Exact<{
  podId: Scalars['Int'];
}>;


export type JoinPodMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'joinPod'>
);

export type LeavePodMutationVariables = Exact<{
  podId: Scalars['Int'];
}>;


export type LeavePodMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'leavePod'>
);

export type RemoveFromPodMutationVariables = Exact<{
  podId: Scalars['Int'];
  userId: Scalars['Int'];
}>;


export type RemoveFromPodMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeFromPod'>
);

export type UninviteToPodMutationVariables = Exact<{
  username: Scalars['String'];
  podId: Scalars['Int'];
}>;


export type UninviteToPodMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uninviteToPod'>
);

export type CreateStoryMutationVariables = Exact<{
  title: Scalars['String'];
  podId: Scalars['Int'];
}>;


export type CreateStoryMutation = (
  { __typename?: 'Mutation' }
  & { createStory: (
    { __typename?: 'StoryResponse' }
    & { story?: Maybe<(
      { __typename?: 'Story' }
      & Pick<Story, 'id' | 'title'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type DeleteStoryMutationVariables = Exact<{
  storyId: Scalars['Int'];
}>;


export type DeleteStoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteStory'>
);

export type MoveStoryMutationVariables = Exact<{
  storyId: Scalars['Int'];
  sourceIndex: Scalars['Int'];
  destinationIndex: Scalars['Int'];
}>;


export type MoveStoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'moveStory'>
);

export type AssignUserToTaskMutationVariables = Exact<{
  userId: Scalars['Int'];
  taskId: Scalars['Int'];
}>;


export type AssignUserToTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'assignUserToTask'>
);

export type CreateTaskMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  storyId: Scalars['Int'];
}>;


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'TaskResponse' }
    & { task?: Maybe<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'title'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type DeleteTaskMutationVariables = Exact<{
  taskId: Scalars['Int'];
}>;


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTask'>
);

export type MoveTaskMutationVariables = Exact<{
  taskId: Scalars['Int'];
  sourceIndex: Scalars['Int'];
  destinationIndex: Scalars['Int'];
  sourceStoryId: Scalars['Int'];
  destinationStoryId: Scalars['Int'];
}>;


export type MoveTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'moveTask'>
);

export type RemoveUserFromTaskMutationVariables = Exact<{
  userId: Scalars['Int'];
  taskId: Scalars['Int'];
}>;


export type RemoveUserFromTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeUserFromTask'>
);

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'username'>
      & { pods: Array<(
        { __typename?: 'Pod' }
        & Pick<Pod, 'id' | 'name' | 'createdAt'>
      )> }
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'username'>
      & { pods: Array<(
        { __typename?: 'Pod' }
        & Pick<Pod, 'id' | 'name' | 'createdAt'>
      )> }
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'createdAt' | 'updatedAt'>
    & { pods: Array<(
      { __typename?: 'Pod' }
      & Pick<Pod, 'id' | 'name' | 'createdAt' | 'isAdmin'>
    )>, sentInvites: Array<(
      { __typename?: 'Invite' }
      & Pick<Invite, 'asAdmin' | 'createdAt'>
      & { pod: (
        { __typename?: 'Pod' }
        & Pick<Pod, 'id' | 'name'>
      ), invitee: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )>, receivedInvites: Array<(
      { __typename?: 'Invite' }
      & Pick<Invite, 'asAdmin' | 'createdAt'>
      & { inviter: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ), invitee: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ), pod: (
        { __typename?: 'Pod' }
        & Pick<Pod, 'id' | 'name'>
      ) }
    )> }
  )> }
);

export type MessagesQueryVariables = Exact<{
  podId: Scalars['Int'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: (
    { __typename?: 'PaginatedMessages' }
    & Pick<PaginatedMessages, 'hasMore'>
    & { result: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'text' | 'createdAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  ) }
);

export type PodQueryVariables = Exact<{
  podId: Scalars['Int'];
}>;


export type PodQuery = (
  { __typename?: 'Query' }
  & { pod?: Maybe<(
    { __typename?: 'Pod' }
    & Pick<Pod, 'id' | 'name' | 'createdAt'>
    & { admins: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, stories: Array<(
      { __typename?: 'Story' }
      & Pick<Story, 'id' | 'title'>
      & { tasks: Array<(
        { __typename?: 'Task' }
        & Pick<Task, 'id' | 'title' | 'description'>
        & { users: Array<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'username'>
        )> }
      )> }
    )> }
  )> }
);

export type NewMessagesSubscriptionVariables = Exact<{
  podId: Scalars['Int'];
}>;


export type NewMessagesSubscription = (
  { __typename?: 'Subscription' }
  & { newMessages?: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);


export const CreateMessageDocument = gql`
    mutation CreateMessage($text: String!, $podId: Int!) {
  createMessage(text: $text, podId: $podId)
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      text: // value for 'text'
 *      podId: // value for 'podId'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, baseOptions);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const CancelInviteDocument = gql`
    mutation CancelInvite($podId: Int!) {
  cancelInvite(podId: $podId)
}
    `;
export type CancelInviteMutationFn = Apollo.MutationFunction<CancelInviteMutation, CancelInviteMutationVariables>;

/**
 * __useCancelInviteMutation__
 *
 * To run a mutation, you first call `useCancelInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelInviteMutation, { data, loading, error }] = useCancelInviteMutation({
 *   variables: {
 *      podId: // value for 'podId'
 *   },
 * });
 */
export function useCancelInviteMutation(baseOptions?: Apollo.MutationHookOptions<CancelInviteMutation, CancelInviteMutationVariables>) {
        return Apollo.useMutation<CancelInviteMutation, CancelInviteMutationVariables>(CancelInviteDocument, baseOptions);
      }
export type CancelInviteMutationHookResult = ReturnType<typeof useCancelInviteMutation>;
export type CancelInviteMutationResult = Apollo.MutationResult<CancelInviteMutation>;
export type CancelInviteMutationOptions = Apollo.BaseMutationOptions<CancelInviteMutation, CancelInviteMutationVariables>;
export const CreatePodDocument = gql`
    mutation CreatePod($name: String!) {
  createPod(name: $name) {
    pod {
      id
      name
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreatePodMutationFn = Apollo.MutationFunction<CreatePodMutation, CreatePodMutationVariables>;

/**
 * __useCreatePodMutation__
 *
 * To run a mutation, you first call `useCreatePodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPodMutation, { data, loading, error }] = useCreatePodMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreatePodMutation(baseOptions?: Apollo.MutationHookOptions<CreatePodMutation, CreatePodMutationVariables>) {
        return Apollo.useMutation<CreatePodMutation, CreatePodMutationVariables>(CreatePodDocument, baseOptions);
      }
export type CreatePodMutationHookResult = ReturnType<typeof useCreatePodMutation>;
export type CreatePodMutationResult = Apollo.MutationResult<CreatePodMutation>;
export type CreatePodMutationOptions = Apollo.BaseMutationOptions<CreatePodMutation, CreatePodMutationVariables>;
export const DeletePodDocument = gql`
    mutation DeletePod($podId: Int!) {
  deletePod(podId: $podId)
}
    `;
export type DeletePodMutationFn = Apollo.MutationFunction<DeletePodMutation, DeletePodMutationVariables>;

/**
 * __useDeletePodMutation__
 *
 * To run a mutation, you first call `useDeletePodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePodMutation, { data, loading, error }] = useDeletePodMutation({
 *   variables: {
 *      podId: // value for 'podId'
 *   },
 * });
 */
export function useDeletePodMutation(baseOptions?: Apollo.MutationHookOptions<DeletePodMutation, DeletePodMutationVariables>) {
        return Apollo.useMutation<DeletePodMutation, DeletePodMutationVariables>(DeletePodDocument, baseOptions);
      }
export type DeletePodMutationHookResult = ReturnType<typeof useDeletePodMutation>;
export type DeletePodMutationResult = Apollo.MutationResult<DeletePodMutation>;
export type DeletePodMutationOptions = Apollo.BaseMutationOptions<DeletePodMutation, DeletePodMutationVariables>;
export const InviteToPodDocument = gql`
    mutation InviteToPod($username: String!, $podId: Int!, $asAdmin: Boolean!) {
  inviteToPod(podId: $podId, username: $username, asAdmin: $asAdmin) {
    invite {
      asAdmin
      createdAt
      invitee {
        id
        username
      }
      pod {
        id
        name
      }
    }
    errors {
      field
      message
    }
  }
}
    `;
export type InviteToPodMutationFn = Apollo.MutationFunction<InviteToPodMutation, InviteToPodMutationVariables>;

/**
 * __useInviteToPodMutation__
 *
 * To run a mutation, you first call `useInviteToPodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteToPodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteToPodMutation, { data, loading, error }] = useInviteToPodMutation({
 *   variables: {
 *      username: // value for 'username'
 *      podId: // value for 'podId'
 *      asAdmin: // value for 'asAdmin'
 *   },
 * });
 */
export function useInviteToPodMutation(baseOptions?: Apollo.MutationHookOptions<InviteToPodMutation, InviteToPodMutationVariables>) {
        return Apollo.useMutation<InviteToPodMutation, InviteToPodMutationVariables>(InviteToPodDocument, baseOptions);
      }
export type InviteToPodMutationHookResult = ReturnType<typeof useInviteToPodMutation>;
export type InviteToPodMutationResult = Apollo.MutationResult<InviteToPodMutation>;
export type InviteToPodMutationOptions = Apollo.BaseMutationOptions<InviteToPodMutation, InviteToPodMutationVariables>;
export const JoinPodDocument = gql`
    mutation JoinPod($podId: Int!) {
  joinPod(podId: $podId)
}
    `;
export type JoinPodMutationFn = Apollo.MutationFunction<JoinPodMutation, JoinPodMutationVariables>;

/**
 * __useJoinPodMutation__
 *
 * To run a mutation, you first call `useJoinPodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinPodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinPodMutation, { data, loading, error }] = useJoinPodMutation({
 *   variables: {
 *      podId: // value for 'podId'
 *   },
 * });
 */
export function useJoinPodMutation(baseOptions?: Apollo.MutationHookOptions<JoinPodMutation, JoinPodMutationVariables>) {
        return Apollo.useMutation<JoinPodMutation, JoinPodMutationVariables>(JoinPodDocument, baseOptions);
      }
export type JoinPodMutationHookResult = ReturnType<typeof useJoinPodMutation>;
export type JoinPodMutationResult = Apollo.MutationResult<JoinPodMutation>;
export type JoinPodMutationOptions = Apollo.BaseMutationOptions<JoinPodMutation, JoinPodMutationVariables>;
export const LeavePodDocument = gql`
    mutation LeavePod($podId: Int!) {
  leavePod(podId: $podId)
}
    `;
export type LeavePodMutationFn = Apollo.MutationFunction<LeavePodMutation, LeavePodMutationVariables>;

/**
 * __useLeavePodMutation__
 *
 * To run a mutation, you first call `useLeavePodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeavePodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leavePodMutation, { data, loading, error }] = useLeavePodMutation({
 *   variables: {
 *      podId: // value for 'podId'
 *   },
 * });
 */
export function useLeavePodMutation(baseOptions?: Apollo.MutationHookOptions<LeavePodMutation, LeavePodMutationVariables>) {
        return Apollo.useMutation<LeavePodMutation, LeavePodMutationVariables>(LeavePodDocument, baseOptions);
      }
export type LeavePodMutationHookResult = ReturnType<typeof useLeavePodMutation>;
export type LeavePodMutationResult = Apollo.MutationResult<LeavePodMutation>;
export type LeavePodMutationOptions = Apollo.BaseMutationOptions<LeavePodMutation, LeavePodMutationVariables>;
export const RemoveFromPodDocument = gql`
    mutation RemoveFromPod($podId: Int!, $userId: Int!) {
  removeFromPod(podId: $podId, userId: $userId)
}
    `;
export type RemoveFromPodMutationFn = Apollo.MutationFunction<RemoveFromPodMutation, RemoveFromPodMutationVariables>;

/**
 * __useRemoveFromPodMutation__
 *
 * To run a mutation, you first call `useRemoveFromPodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromPodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromPodMutation, { data, loading, error }] = useRemoveFromPodMutation({
 *   variables: {
 *      podId: // value for 'podId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveFromPodMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromPodMutation, RemoveFromPodMutationVariables>) {
        return Apollo.useMutation<RemoveFromPodMutation, RemoveFromPodMutationVariables>(RemoveFromPodDocument, baseOptions);
      }
export type RemoveFromPodMutationHookResult = ReturnType<typeof useRemoveFromPodMutation>;
export type RemoveFromPodMutationResult = Apollo.MutationResult<RemoveFromPodMutation>;
export type RemoveFromPodMutationOptions = Apollo.BaseMutationOptions<RemoveFromPodMutation, RemoveFromPodMutationVariables>;
export const UninviteToPodDocument = gql`
    mutation UninviteToPod($username: String!, $podId: Int!) {
  uninviteToPod(podId: $podId, username: $username)
}
    `;
export type UninviteToPodMutationFn = Apollo.MutationFunction<UninviteToPodMutation, UninviteToPodMutationVariables>;

/**
 * __useUninviteToPodMutation__
 *
 * To run a mutation, you first call `useUninviteToPodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUninviteToPodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uninviteToPodMutation, { data, loading, error }] = useUninviteToPodMutation({
 *   variables: {
 *      username: // value for 'username'
 *      podId: // value for 'podId'
 *   },
 * });
 */
export function useUninviteToPodMutation(baseOptions?: Apollo.MutationHookOptions<UninviteToPodMutation, UninviteToPodMutationVariables>) {
        return Apollo.useMutation<UninviteToPodMutation, UninviteToPodMutationVariables>(UninviteToPodDocument, baseOptions);
      }
export type UninviteToPodMutationHookResult = ReturnType<typeof useUninviteToPodMutation>;
export type UninviteToPodMutationResult = Apollo.MutationResult<UninviteToPodMutation>;
export type UninviteToPodMutationOptions = Apollo.BaseMutationOptions<UninviteToPodMutation, UninviteToPodMutationVariables>;
export const CreateStoryDocument = gql`
    mutation CreateStory($title: String!, $podId: Int!) {
  createStory(title: $title, podId: $podId) {
    story {
      id
      title
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateStoryMutationFn = Apollo.MutationFunction<CreateStoryMutation, CreateStoryMutationVariables>;

/**
 * __useCreateStoryMutation__
 *
 * To run a mutation, you first call `useCreateStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStoryMutation, { data, loading, error }] = useCreateStoryMutation({
 *   variables: {
 *      title: // value for 'title'
 *      podId: // value for 'podId'
 *   },
 * });
 */
export function useCreateStoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateStoryMutation, CreateStoryMutationVariables>) {
        return Apollo.useMutation<CreateStoryMutation, CreateStoryMutationVariables>(CreateStoryDocument, baseOptions);
      }
export type CreateStoryMutationHookResult = ReturnType<typeof useCreateStoryMutation>;
export type CreateStoryMutationResult = Apollo.MutationResult<CreateStoryMutation>;
export type CreateStoryMutationOptions = Apollo.BaseMutationOptions<CreateStoryMutation, CreateStoryMutationVariables>;
export const DeleteStoryDocument = gql`
    mutation DeleteStory($storyId: Int!) {
  deleteStory(storyId: $storyId)
}
    `;
export type DeleteStoryMutationFn = Apollo.MutationFunction<DeleteStoryMutation, DeleteStoryMutationVariables>;

/**
 * __useDeleteStoryMutation__
 *
 * To run a mutation, you first call `useDeleteStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStoryMutation, { data, loading, error }] = useDeleteStoryMutation({
 *   variables: {
 *      storyId: // value for 'storyId'
 *   },
 * });
 */
export function useDeleteStoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStoryMutation, DeleteStoryMutationVariables>) {
        return Apollo.useMutation<DeleteStoryMutation, DeleteStoryMutationVariables>(DeleteStoryDocument, baseOptions);
      }
export type DeleteStoryMutationHookResult = ReturnType<typeof useDeleteStoryMutation>;
export type DeleteStoryMutationResult = Apollo.MutationResult<DeleteStoryMutation>;
export type DeleteStoryMutationOptions = Apollo.BaseMutationOptions<DeleteStoryMutation, DeleteStoryMutationVariables>;
export const MoveStoryDocument = gql`
    mutation MoveStory($storyId: Int!, $sourceIndex: Int!, $destinationIndex: Int!) {
  moveStory(
    storyId: $storyId
    sourceIndex: $sourceIndex
    destinationIndex: $destinationIndex
  )
}
    `;
export type MoveStoryMutationFn = Apollo.MutationFunction<MoveStoryMutation, MoveStoryMutationVariables>;

/**
 * __useMoveStoryMutation__
 *
 * To run a mutation, you first call `useMoveStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveStoryMutation, { data, loading, error }] = useMoveStoryMutation({
 *   variables: {
 *      storyId: // value for 'storyId'
 *      sourceIndex: // value for 'sourceIndex'
 *      destinationIndex: // value for 'destinationIndex'
 *   },
 * });
 */
export function useMoveStoryMutation(baseOptions?: Apollo.MutationHookOptions<MoveStoryMutation, MoveStoryMutationVariables>) {
        return Apollo.useMutation<MoveStoryMutation, MoveStoryMutationVariables>(MoveStoryDocument, baseOptions);
      }
export type MoveStoryMutationHookResult = ReturnType<typeof useMoveStoryMutation>;
export type MoveStoryMutationResult = Apollo.MutationResult<MoveStoryMutation>;
export type MoveStoryMutationOptions = Apollo.BaseMutationOptions<MoveStoryMutation, MoveStoryMutationVariables>;
export const AssignUserToTaskDocument = gql`
    mutation AssignUserToTask($userId: Int!, $taskId: Int!) {
  assignUserToTask(userId: $userId, taskId: $taskId)
}
    `;
export type AssignUserToTaskMutationFn = Apollo.MutationFunction<AssignUserToTaskMutation, AssignUserToTaskMutationVariables>;

/**
 * __useAssignUserToTaskMutation__
 *
 * To run a mutation, you first call `useAssignUserToTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUserToTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUserToTaskMutation, { data, loading, error }] = useAssignUserToTaskMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useAssignUserToTaskMutation(baseOptions?: Apollo.MutationHookOptions<AssignUserToTaskMutation, AssignUserToTaskMutationVariables>) {
        return Apollo.useMutation<AssignUserToTaskMutation, AssignUserToTaskMutationVariables>(AssignUserToTaskDocument, baseOptions);
      }
export type AssignUserToTaskMutationHookResult = ReturnType<typeof useAssignUserToTaskMutation>;
export type AssignUserToTaskMutationResult = Apollo.MutationResult<AssignUserToTaskMutation>;
export type AssignUserToTaskMutationOptions = Apollo.BaseMutationOptions<AssignUserToTaskMutation, AssignUserToTaskMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($title: String!, $description: String!, $storyId: Int!) {
  createTask(title: $title, description: $description, storyId: $storyId) {
    task {
      id
      title
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      storyId: // value for 'storyId'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, baseOptions);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($taskId: Int!) {
  deleteTask(taskId: $taskId)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, baseOptions);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const MoveTaskDocument = gql`
    mutation MoveTask($taskId: Int!, $sourceIndex: Int!, $destinationIndex: Int!, $sourceStoryId: Int!, $destinationStoryId: Int!) {
  moveTask(
    taskId: $taskId
    sourceIndex: $sourceIndex
    destinationIndex: $destinationIndex
    sourceStoryId: $sourceStoryId
    destinationStoryId: $destinationStoryId
  )
}
    `;
export type MoveTaskMutationFn = Apollo.MutationFunction<MoveTaskMutation, MoveTaskMutationVariables>;

/**
 * __useMoveTaskMutation__
 *
 * To run a mutation, you first call `useMoveTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveTaskMutation, { data, loading, error }] = useMoveTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      sourceIndex: // value for 'sourceIndex'
 *      destinationIndex: // value for 'destinationIndex'
 *      sourceStoryId: // value for 'sourceStoryId'
 *      destinationStoryId: // value for 'destinationStoryId'
 *   },
 * });
 */
export function useMoveTaskMutation(baseOptions?: Apollo.MutationHookOptions<MoveTaskMutation, MoveTaskMutationVariables>) {
        return Apollo.useMutation<MoveTaskMutation, MoveTaskMutationVariables>(MoveTaskDocument, baseOptions);
      }
export type MoveTaskMutationHookResult = ReturnType<typeof useMoveTaskMutation>;
export type MoveTaskMutationResult = Apollo.MutationResult<MoveTaskMutation>;
export type MoveTaskMutationOptions = Apollo.BaseMutationOptions<MoveTaskMutation, MoveTaskMutationVariables>;
export const RemoveUserFromTaskDocument = gql`
    mutation RemoveUserFromTask($userId: Int!, $taskId: Int!) {
  removeUserFromTask(userId: $userId, taskId: $taskId)
}
    `;
export type RemoveUserFromTaskMutationFn = Apollo.MutationFunction<RemoveUserFromTaskMutation, RemoveUserFromTaskMutationVariables>;

/**
 * __useRemoveUserFromTaskMutation__
 *
 * To run a mutation, you first call `useRemoveUserFromTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserFromTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserFromTaskMutation, { data, loading, error }] = useRemoveUserFromTaskMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useRemoveUserFromTaskMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserFromTaskMutation, RemoveUserFromTaskMutationVariables>) {
        return Apollo.useMutation<RemoveUserFromTaskMutation, RemoveUserFromTaskMutationVariables>(RemoveUserFromTaskDocument, baseOptions);
      }
export type RemoveUserFromTaskMutationHookResult = ReturnType<typeof useRemoveUserFromTaskMutation>;
export type RemoveUserFromTaskMutationResult = Apollo.MutationResult<RemoveUserFromTaskMutation>;
export type RemoveUserFromTaskMutationOptions = Apollo.BaseMutationOptions<RemoveUserFromTaskMutation, RemoveUserFromTaskMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    user {
      id
      email
      username
      pods {
        id
        name
        createdAt
      }
    }
    errors {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!) {
  register(data: {username: $username, email: $email, password: $password}) {
    user {
      id
      email
      username
      pods {
        id
        name
        createdAt
      }
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    createdAt
    updatedAt
    pods {
      id
      name
      createdAt
      isAdmin
    }
    sentInvites {
      asAdmin
      createdAt
      pod {
        id
        name
      }
      invitee {
        id
        username
      }
    }
    receivedInvites {
      asAdmin
      createdAt
      inviter {
        id
        username
      }
      invitee {
        id
        username
      }
      pod {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MessagesDocument = gql`
    query Messages($podId: Int!, $limit: Int!, $cursor: String) {
  messages(podId: $podId, limit: $limit, cursor: $cursor) {
    result {
      id
      text
      createdAt
      user {
        id
        username
      }
    }
    hasMore
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      podId: // value for 'podId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const PodDocument = gql`
    query Pod($podId: Int!) {
  pod(podId: $podId) {
    id
    name
    createdAt
    admins {
      id
      username
    }
    members {
      id
      username
    }
    stories {
      id
      title
      tasks {
        id
        title
        description
        users {
          id
          username
        }
      }
    }
  }
}
    `;

/**
 * __usePodQuery__
 *
 * To run a query within a React component, call `usePodQuery` and pass it any options that fit your needs.
 * When your component renders, `usePodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePodQuery({
 *   variables: {
 *      podId: // value for 'podId'
 *   },
 * });
 */
export function usePodQuery(baseOptions: Apollo.QueryHookOptions<PodQuery, PodQueryVariables>) {
        return Apollo.useQuery<PodQuery, PodQueryVariables>(PodDocument, baseOptions);
      }
export function usePodLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PodQuery, PodQueryVariables>) {
          return Apollo.useLazyQuery<PodQuery, PodQueryVariables>(PodDocument, baseOptions);
        }
export type PodQueryHookResult = ReturnType<typeof usePodQuery>;
export type PodLazyQueryHookResult = ReturnType<typeof usePodLazyQuery>;
export type PodQueryResult = Apollo.QueryResult<PodQuery, PodQueryVariables>;
export const NewMessagesDocument = gql`
    subscription NewMessages($podId: Int!) {
  newMessages(podId: $podId) {
    id
    text
    createdAt
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useNewMessagesSubscription__
 *
 * To run a query within a React component, call `useNewMessagesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessagesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessagesSubscription({
 *   variables: {
 *      podId: // value for 'podId'
 *   },
 * });
 */
export function useNewMessagesSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewMessagesSubscription, NewMessagesSubscriptionVariables>) {
        return Apollo.useSubscription<NewMessagesSubscription, NewMessagesSubscriptionVariables>(NewMessagesDocument, baseOptions);
      }
export type NewMessagesSubscriptionHookResult = ReturnType<typeof useNewMessagesSubscription>;
export type NewMessagesSubscriptionResult = Apollo.SubscriptionResult<NewMessagesSubscription>;