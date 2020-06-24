# Openshift Readme File

This file notes some of the differences between this version of Grafana and the upstream version.

## Build Dependencies

Building the backend requires Go >= 1.12.

Building the front-end code requires:

* yum/dnf install make g++
* NodeJS version 10.x is required for building the frontend code for grafana 6.x.

## Upgrade to a new upstream version

**For each upgrade to a new upstream version, the front-end sources must be
regenerated and committed to the repository.**

To install Yarn and the project's dependencies:

```
npm install -g yarn
```

Merge upstream into the OpenShift fork:

```
VERSION="vX.Y.Z"
git fetch origin --tags
git fetch openshift # Assuming that openshift points to https://github.com/openshift/grafana
git checkout openshift/master -b "bump-${VERSION}"
git merge "origin/${VERSION}"
```

Resolve conflicts by taking everything from upstream except for:

* `.gitignore` (`/public/build`, `/public/views/error.html` and `/public/views/index.html` shouldn't be ignored).
* `.dockerignore`

Rebuild the Javascript assets:

```
make clean deps-js build-js
```

Commit the generated files in ./public/build

Once the front-end build is complete, the files in `public/build` and `public/views`
must be committed to the git.  The reason for this is that the front-end build
requires several dependencies that are not currently packaged for OpenShift.



## Tips and tricks

Check the differences between the upstream and downstream versions:

```
git diff --patch-with-stat ${VERSION}
```

The only differences should be:
* `.gitignore`
* `.dockerignore`
* Added files specific to OCP (`Dockerfile.ocp`, `OWNERS`, this README file, `public/build` and `public/views`)

If `make build-js` fails, verify that you don't have left-over files from a
previous version in the `public/app` directory.

## Testing

The new configuration can be tested by building and running the OpenShift container
image.

```
docker build -t grafana-test -f Dockerfile.ocp . && docker run -p 3000:3000 grafana-test
```
