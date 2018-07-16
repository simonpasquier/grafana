FROM openshift/origin-base

ENV GOPATH="/go"
ENV GOBIN="${GOPATH}/bin"
ENV PATH="${GOBIN}:${PATH}"
RUN mkdir -p $GOBIN

COPY . $GOPATH/src/github.com/grafana/grafana

RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash - && \
    curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo && \
    yum install -y golang make git nodejs yarn tar bzip2 bzip2-libs && \
    cd $GOPATH/src/github.com/grafana/grafana && \
    curl https://raw.githubusercontent.com/golang/dep/master/install.sh | sh && \
    go run build.go setup && \
    go run build.go build && \
    npm install -g yarn && \
    yarn install --pure-lockfile && \
    npm run build && \
    yum erase -y golang make git && yum clean all

LABEL io.k8s.display-name="Grafana" \
      io.k8s.description="" \
      io.openshift.tags="openshift" \
      maintainer="Frederic Branczyk <fbranczy@redhat.com>"

# doesn't require a root user.
USER 1001

WORKDIR $GOPATH/src/github.com/grafana/grafana
ENTRYPOINT ["/go/src/github.com/grafana/grafana/bin/linux-amd64/grafana-server"]
