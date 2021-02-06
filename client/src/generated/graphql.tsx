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
};


export type QueryPodArgs = {
  id: Scalars['Int'];
};


export type QueryStoryArgs = {
  id: Scalars['Int'];
};


export type QueryTaskArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  pods: Array<Pod>;
  tasks: Array<Task>;
};

export type Pod = {
  __typename?: 'Pod';
  id: Scalars['Int'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
  stories: Array<Story>;
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

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  createPod: PodResponse;
  joinPod: Scalars['Boolean'];
  leavePod: Scalars['Boolean'];
  deletePod: Scalars['Boolean'];
  moveStory: Scalars['Boolean'];
  createStory: StoryResponse;
  deleteStory: Scalars['Boolean'];
  moveTask: Scalars['Boolean'];
  createTask: TaskResponse;
  assignUserToTask: Scalars['Boolean'];
  removeUserFromTask: Scalars['Boolean'];
  deleteTask: Scalars['Boolean'];
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
  data: PodInput;
};


export type MutationJoinPodArgs = {
  userId: Scalars['Float'];
  podId: Scalars['Float'];
};


export type MutationLeavePodArgs = {
  userId: Scalars['Float'];
  podId: Scalars['Float'];
};


export type MutationDeletePodArgs = {
  podId: Scalars['Float'];
};


export type MutationMoveStoryArgs = {
  destinationIndex: Scalars['Int'];
  sourceIndex: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationCreateStoryArgs = {
  data: StoryInput;
};


export type MutationDeleteStoryArgs = {
  storyId: Scalars['Float'];
};


export type MutationMoveTaskArgs = {
  destinationStoryId: Scalars['Int'];
  sourceStoryId: Scalars['Int'];
  destinationIndex: Scalars['Int'];
  sourceIndex: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationCreateTaskArgs = {
  data: TaskInput;
};


export type MutationAssignUserToTaskArgs = {
  userId: Scalars['Float'];
  taskId: Scalars['Float'];
};


export type MutationRemoveUserFromTaskArgs = {
  userId: Scalars['Float'];
  taskId: Scalars['Float'];
};


export type MutationDeleteTaskArgs = {
  taskId: Scalars['Float'];
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

export type PodInput = {
  name: Scalars['String'];
};

export type StoryResponse = {
  __typename?: 'StoryResponse';
  errors?: Maybe<Array<FieldError>>;
  story?: Maybe<Story>;
};

export type StoryInput = {
  title: Scalars['String'];
  podId: Scalars['Float'];
};

export type TaskResponse = {
  __typename?: 'TaskResponse';
  errors?: Maybe<Array<FieldError>>;
  task?: Maybe<Task>;
};

export type TaskInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  storyId: Scalars['Float'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type PodQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PodQuery = (
  { __typename?: 'Query' }
  & { pod?: Maybe<(
    { __typename?: 'Pod' }
    & Pick<Pod, 'id' | 'name'>
    & { stories: Array<(
      { __typename?: 'Story' }
      & Pick<Story, 'id' | 'title'>
      & { tasks: Array<(
        { __typename?: 'Task' }
        & Pick<Task, 'id' | 'title'>
      )> }
    )> }
  )> }
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

export type MoveStoryMutationVariables = Exact<{
  id: Scalars['Int'];
  sourceIndex: Scalars['Int'];
  destinationIndex: Scalars['Int'];
}>;


export type MoveStoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'moveStory'>
);

export type MoveTaskMutationVariables = Exact<{
  id: Scalars['Int'];
  sourceIndex: Scalars['Int'];
  destinationIndex: Scalars['Int'];
  sourceStoryId: Scalars['Int'];
  destinationStoryId: Scalars['Int'];
}>;


export type MoveTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'moveTask'>
);


export const MeDocument = gql`
    query Me {
  me {
    id
    username
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
export const PodDocument = gql`
    query Pod($id: Int!) {
  pod(id: $id) {
    id
    name
    stories {
      id
      title
      tasks {
        id
        title
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
 *      id: // value for 'id'
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
export const CreatePodDocument = gql`
    mutation CreatePod($name: String!) {
  createPod(data: {name: $name}) {
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
export const MoveStoryDocument = gql`
    mutation MoveStory($id: Int!, $sourceIndex: Int!, $destinationIndex: Int!) {
  moveStory(
    id: $id
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
 *      id: // value for 'id'
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
export const MoveTaskDocument = gql`
    mutation MoveTask($id: Int!, $sourceIndex: Int!, $destinationIndex: Int!, $sourceStoryId: Int!, $destinationStoryId: Int!) {
  moveTask(
    id: $id
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
 *      id: // value for 'id'
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