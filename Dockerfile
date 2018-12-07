FROM openshift/origin-base

ENV GOPATH="/go"
ENV GOBIN="${GOPATH}/bin"
ENV PATH="${GOBIN}:${PATH}"
RUN mkdir -p $GOBIN

COPY . $GOPATH/src/github.com/grafana/grafana

RUN yum install -y golang make git && \
    cd $GOPATH/src/github.com/grafana/grafana && \
    go run build.go build && \
    cp $GOPATH/src/github.com/grafana/grafana/bin/linux-$(go env GOARCH)/grafana-server /usr/bin/ && \
    yum autoremove -y golang make git && yum clean all && \
    rm -rf .git

LABEL io.k8s.display-name="Grafana" \
      io.k8s.description="" \
      io.openshift.tags="openshift" \
      maintainer="Frederic Branczyk <fbranczy@redhat.com>"

# doesn't require a root user.
USER 1001

WORKDIR $GOPATH/src/github.com/grafana/grafana
ENTRYPOINT ["/usr/bin/grafana-server"]
