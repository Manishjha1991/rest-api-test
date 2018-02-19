module.exports = {
  apps: [
    {
      name: "basis-api",
      script: "./build/index.js",
      watch: true,
      env: {
        NODE_ENV: "staging"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],
  deploy: {
    staging: {
      user: "ubuntu",
      host: "ec2-13-126-195-157.ap-south-1.compute.amazonaws.com",
      key: "~/.ssh/basis.pem",
      ref: "origin/master",
      repo: "git@github.com:XelpmocDesignandTechPvtLtd/basis-api.git",
      path: "/home/ubuntu/basis-api",
      "post-deploy": "yarn install && yarn run start"
    }
  }
};
