echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin "$DOCKER_REGISTRY"
docker tag $DOCKER_IMAGE_ALFANET $DOCKER_IMAGE_ALFANET
docker tag $DOCKER_IMAGE_ALFANET $DOCKER_IMAGE
docker push $DOCKER_IMAGE_ALFANET
docker push $DOCKER_IMAGE