# @db-studio/api

## 1.0.10

### Patch Changes

- Updated dependencies
  - @db-studio/app@1.4.3

## 1.0.9

### Patch Changes

- Updated dependencies
  - @db-studio/utils@1.1.1
  - @db-studio/app@1.4.2
  - @db-studio/extensions-sdk@1.0.6
  - @db-studio/storage-driver-azure@1.0.3
  - @db-studio/storage-driver-cloudinary@1.0.3
  - @db-studio/storage-driver-gcs@1.0.3
  - @db-studio/storage-driver-local@1.0.3
  - @db-studio/storage-driver-s3@1.0.3

## 1.0.8

### Patch Changes

- Updated dependencies
  - @db-studio/app@1.4.1

## 1.0.7

### Patch Changes

- Updated dependencies [ee2b56c]
  - @db-studio/app@1.4.0

## 1.0.6

### Patch Changes

- Actually build the packages...
- Updated dependencies
  - @db-studio/app@1.3.1

## 1.0.5

### Patch Changes

- Updated dependencies [58754f3]
  - @db-studio/app@1.3.0

## 1.0.4

### Patch Changes

- Updated dependencies [8409dca]
  - @db-studio/utils@1.1.0
  - @db-studio/app@1.2.0
  - @db-studio/extensions-sdk@1.0.5
  - @db-studio/storage-driver-azure@1.0.2
  - @db-studio/storage-driver-cloudinary@1.0.2
  - @db-studio/storage-driver-gcs@1.0.2
  - @db-studio/storage-driver-local@1.0.2
  - @db-studio/storage-driver-s3@1.0.2

## 1.0.3

### Patch Changes

- Updated dependencies
  - @db-studio/update-check@1.1.0
  - @db-studio/app@1.1.0
  - @db-studio/exceptions@1.0.1
  - @db-studio/extensions-sdk@1.0.4
  - @db-studio/utils@1.0.1

## 1.0.2

### Patch Changes

- see if we can reset the storage driver version
- Updated dependencies
  - @db-studio/extensions-sdk@1.0.3
  - @db-studio/db-schema@1.0.2
  - @db-studio/storage-driver-s3@1.0.1
  - @db-studio/app@1.0.1
  - @db-studio/exceptions@1.0.1
  - @db-studio/utils@1.0.1

## 1.0.2

### Patch Changes

- Add packages, some shenanigans to fix versions
- Updated dependencies
  - @db-studio/db-schema@1.0.1
  - @db-studio/app@1.0.1
  - @db-studio/exceptions@1.0.1
  - @db-studio/extensions-sdk@1.0.2
  - @db-studio/utils@1.0.1

## 1.0.1

### Patch Changes

- Fix an incorrect dependency version (storage-driver-s3)
- More naming, fix the create-extension package to work without specifying a binary
- Updated dependencies
  - @db-studio/storage-driver-cloudinary@1.0.1
  - @db-studio/storage-driver-azure@1.0.1
  - @db-studio/storage-driver-local@1.0.1
  - @db-studio/storage-driver-gcs@1.0.1
  - @db-studio/storage-driver-s3@9.26.8
  - @db-studio/extensions-sdk@1.0.1
  - @db-studio/update-check@1.0.1
  - @db-studio/exceptions@1.0.1
  - @db-studio/constants@1.0.1
  - @db-studio/storage@1.0.1
  - @db-studio/schema@9.26.4
  - @db-studio/specs@1.0.1
  - @db-studio/utils@1.0.1
  - @db-studio/app@1.0.1

## 10.3.0

### Minor Changes

- fcf6cf4: Empty realease to update d9 version

## 10.2.0

### Minor Changes

- bce4637: Make partitionned optional

## 10.1.0

### Minor Changes

- 4d186ff: This pull request introduces the "Partitioned" tag for the sessions cookie to prevent it from being treated
  as a third-party cookie by browsers. Additionally, it adds an environment variable REFRESH_TOKEN_COOKIE_PARTITIONED
  which can be set to false to deactivate this feature.

## 10.0.0

### Major Changes

- 65185c3: Refactored and fixed Oauth and OpendId flows

### Minor Changes

- 65185c3: Revoke tokens on sessions logout for OpenId SSO

## 9.29.0

### Minor Changes

- 41a3210: Revoke tokens on sessions logout for OpenId SSO

## 9.28.0

### Minor Changes

- 7255037: Fix openid connector for keycloack
- 6d7f40e: fix cache compression

### Patch Changes

- Updated dependencies [9d909a7]
  - @wbce-d9/app@9.29.0

## 9.27.0

### Minor Changes

- 7c1b7c7: Fix M2M panel visualization for collections

### Patch Changes

- Updated dependencies [7c1b7c7]
  - @wbce-d9/utils@9.28.0
  - @wbce-d9/app@9.28.0
  - @wbce-d9/extensions-sdk@9.26.5
  - @wbce-d9/storage-driver-azure@9.26.5
  - @wbce-d9/storage-driver-cloudinary@9.26.5
  - @wbce-d9/storage-driver-gcs@9.26.5
  - @wbce-d9/storage-driver-local@9.26.5
  - @wbce-d9/storage-driver-s3@9.26.7

## 9.26.7

### Patch Changes

- Updated dependencies
  - @wbce-d9/app@9.27.0

## 9.26.6

### Patch Changes

- 5998365: update aws-sdk
- Updated dependencies [5998365]
  - @wbce-d9/storage-driver-s3@9.26.6

## 9.26.5

### Patch Changes

- b2b739e: update aws-sdk
- Updated dependencies [b2b739e]
  - @wbce-d9/storage-driver-s3@9.26.5

## 9.26.4

### Patch Changes

- Updated dependencies [9740cc5]
  - @wbce-d9/utils@9.27.0
  - @wbce-d9/app@9.26.4
  - @wbce-d9/extensions-sdk@9.26.4
  - @wbce-d9/storage-driver-azure@9.26.4
  - @wbce-d9/storage-driver-cloudinary@9.26.4
  - @wbce-d9/storage-driver-gcs@9.26.4
  - @wbce-d9/storage-driver-local@9.26.4
  - @wbce-d9/storage-driver-s3@9.26.4

## 9.26.3

### Patch Changes

- f1b4684: change package organization
- Updated dependencies [f1b4684]
  - @wbce-d9/storage-driver-cloudinary@9.26.3
  - @wbce-d9/storage-driver-azure@9.26.3
  - @wbce-d9/storage-driver-local@9.26.3
  - @wbce-d9/storage-driver-gcs@9.26.3
  - @wbce-d9/storage-driver-s3@9.26.3
  - @wbce-d9/extensions-sdk@9.26.3
  - @wbce-d9/update-check@9.26.3
  - @wbce-d9/exceptions@9.26.3
  - @wbce-d9/constants@9.26.3
  - @wbce-d9/storage@9.26.3
  - @wbce-d9/schema@9.26.3
  - @wbce-d9/specs@9.26.3
  - @wbce-d9/utils@9.26.3
  - @wbce-d9/app@9.26.3

## 9.26.2

### Patch Changes

- 973f4bb: update packages
- Updated dependencies [973f4bb]
  - @wbce-d9/app@9.26.2
  - @wbce-d9/constants@9.26.2
  - @wbce-d9/exceptions@9.26.2
  - @wbce-d9/extensions-sdk@9.26.2
  - @wbce-d9/schema@9.26.2
  - @wbce-d9/specs@9.26.2
  - @wbce-d9/storage@9.26.2
  - @wbce-d9/storage-driver-azure@9.26.2
  - @wbce-d9/storage-driver-cloudinary@9.26.2
  - @wbce-d9/storage-driver-gcs@9.26.2
  - @wbce-d9/storage-driver-local@9.26.2
  - @wbce-d9/storage-driver-s3@9.26.2
  - @wbce-d9/update-check@9.26.2
  - @wbce-d9/utils@9.26.2

## 9.26.1

### Patch Changes

- 9e4a63a: @directus9
- Updated dependencies [9e4a63a]
  - @wbce-d9/storage-driver-cloudinary@9.26.1
  - @wbce-d9/storage-driver-azure@9.26.1
  - @wbce-d9/storage-driver-local@9.26.1
  - @wbce-d9/storage-driver-gcs@9.26.1
  - @wbce-d9/storage-driver-s3@9.26.1
  - @wbce-d9/extensions-sdk@9.26.1
  - @wbce-d9/update-check@9.26.1
  - @wbce-d9/exceptions@9.26.1
  - @wbce-d9/constants@9.26.1
  - @wbce-d9/storage@9.26.1
  - @wbce-d9/schema@9.26.1
  - @wbce-d9/specs@9.26.1
  - @wbce-d9/utils@9.26.1
  - @wbce-d9/app@9.26.1
