# Openshift Readme File

This file notes some of the differences between this version of grafana and the upstream version.

## Build Dependencies

Building the backend requires go 1.12

Building the front-end code requires:

   * yum/dnf install make g++
   * NodeJS version 10.x is required for building the frontend code for grafana 6.4.x

## Upgrade/Merge New Upstream Version

For each upgrade to new upstream version, the frontend sources must be regenerated

    npm install -g yarn
    yarn install --pure-lockfile
    yarn start

Once the frontend build is complete, the files in `public/build` and `public/views`
must be committed to the git.  The reason for this is that the frontend build
requires several dependencies that are not currently packaged for openshift.

## Testing

The new configuration can be tested by building and running the openshift docker
image.

    docker build -t grafana-test -f Dockerfile.ocp . && docker run -p 3000:3000 grafana-test
