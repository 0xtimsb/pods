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
  createStory: StoryResponse;
  deleteStory: Scalars['Boolean'];
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


export type MutationCreateStoryArgs = {
  data: StoryInput;
};


export type MutationDeleteStoryArgs = {
  storyId: Scalars['Float'];
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
      & Pick<Story, 'id' | 'title' | 'rank'>
      & { tasks: Array<(
        { __typename?: 'Task' }
        & Pick<Task, 'id' | 'title' | 'rank'>
      )> }
    )> }
  )> }
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
      rank
      tasks {
        id
        title
        rank
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