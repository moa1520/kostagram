const USER_FRAGMENT = `
    id
    username
    avatar
`;

const COMMENT_FRAGMENT = `
    id
    text
    user {
      ${USER_FRAGMENT}
    }
`;

const FILE_FRAGMENT = `
    id
    url
`;

export const MESSAGE_FRAGMENT = `
  id
  text
  to {
    ${USER_FRAGMENT}
  }
  from {
    ${USER_FRAGMENT}
  }
`;

export const ROOM_FRAGMENT = `
  fragment Roomparts on Room {
    id
    participants {
      ${USER_FRAGMENT}
    }
    messages {
      ${MESSAGE_FRAGMENT}
    }
  }
`;
