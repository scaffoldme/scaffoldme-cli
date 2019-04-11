MAKEFLAGS = -j1

export NODE_ENV = test


install-npm-dependencies:
	echo "Installing Node dependencies for environment $(NODE_ENV)"
	npm install $(if $(filter production staging,$(NODE_ENV)),--production,)
ifeq ($(NODE_ENV), development)
	make install-selenium
endif
