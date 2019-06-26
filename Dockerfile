FROM openshift/origin-release:golang-1.12 AS builder

ENV GOPATH="/go"
ENV GOBIN="${GOPATH}/bin"
ENV PATH="${GOBIN}:${PATH}"
RUN mkdir -p $GOBIN

COPY . $GOPATH/src/github.com/grafana/grafana

#RUN yum install -y make git
ENV GOFLAGS="-mod=vendor"
RUN cd $GOPATH/src/github.com/grafana/grafana && go run build.go build
RUN cp $GOPATH/src/github.com/grafana/grafana/bin/linux-$(go env GOARCH)/grafana-server /usr/bin/
RUN rm -rf $GOPATH/src/github.com/grafana/grafana/.git

FROM openshift/origin-base

ENV GOPATH="/go"
ENV GOBIN="${GOPATH}/bin"
ENV PATH="${GOBIN}:${PATH}"
RUN mkdir -p $GOBIN

COPY --from=builder /usr/bin/grafana-server /usr/bin/grafana-server
COPY --from=builder $GOPATH/src/github.com/grafana/grafana $GOPATH/src/github.com/grafana/grafana

LABEL io.k8s.display-name="Grafana" \
      io.k8s.description="" \
      io.openshift.tags="openshift" \
      maintainer="Frederic Branczyk <fbranczy@redhat.com>"

# doesn't require a root user.
USER 1001

WORKDIR $GOPATH/src/github.com/grafana/grafana
ENTRYPOINT ["/usr/bin/grafana-server"]
