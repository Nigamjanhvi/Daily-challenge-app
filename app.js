// ==================== Celebration & Animation Effects ====================
// Handles page navigation logic
// Manages daily challenge generation
// Stores user progress in local storage

function createConfetti() {
  const colors = ['#2563EB', '#38BDF8', '#0F172A', '#475569', '#E2E8F0'];
  const confetti = document.createElement('div');
  confetti.style.position = 'fixed';
  confetti.style.width = '10px';
  confetti.style.height = '10px';
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  confetti.style.borderRadius = '50%';
  confetti.style.pointerEvents = 'none';
  confetti.style.left = Math.random() * window.innerWidth + 'px';
  confetti.style.top = '-10px';
  confetti.style.zIndex = '9999';
  confetti.style.animation = `fall 3s linear forwards`;
  confetti.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
  
  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 3000);
}

function celebrateSuccess() {
  for (let i = 0; i < 30; i++) {
    setTimeout(createConfetti, i * 50);
  }
}

// Create floating particles in background
function createParticles() {
  const container = document.getElementById('particlesContainer');
  if (!container) return;
  
  const particleCount = 15;
  const colors = ['rgba(37, 99, 235, 0.1)', 'rgba(56, 189, 248, 0.1)', 'rgba(15, 23, 42, 0.05)'];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 60 + 20 + 'px';
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.filter = 'blur(2px)';
    particle.style.animation = `float ${10 + Math.random() * 10}s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(particle);
  }
}

// Add animation keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 10px rgba(0, 102, 255, 0.5); }
    50% { box-shadow: 0 0 20px rgba(0, 102, 255, 0.8); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    25% { transform: translateY(-30px) translateX(10px); }
    50% { transform: translateY(-60px) translateX(-10px); }
    75% { transform: translateY(-30px) translateX(15px); }
  }
`;
document.head.appendChild(style);
const challengesDatabase = {
  docker: [
    {
      id: 1,
      topic: 'docker',
      question: 'What is Docker and how does it differ from Virtual Machines?',
      explanation: 'Docker is a containerization platform that packages applications and their dependencies into lightweight containers. Unlike VMs which require a full OS, Docker containers share the host OS kernel, making them faster and more efficient. Each container is isolated and portable, ensuring consistency across environments.',
      hint: 'Think about how containers share the OS kernel vs VMs that need full operating systems.'
    },
    {
      id: 2,
      topic: 'docker',
      question: 'Write a Dockerfile to containerize a simple Node.js application. What are the key components?',
      explanation: 'A Dockerfile contains a series of instructions to build a Docker image. Key components: FROM (base image), WORKDIR (working directory), COPY (copy files), RUN (execute commands), EXPOSE (expose ports), and CMD/ENTRYPOINT (run app). Example: FROM node:16, WORKDIR /app, COPY . ., RUN npm install, EXPOSE 3000, CMD ["npm", "start"]',
      hint: 'Remember: base image → working directory → copy files → install dependencies → expose ports → set command'
    },
    {
      id: 3,
      topic: 'docker',
      question: 'Explain the difference between COPY and ADD instructions in Dockerfile',
      explanation: 'COPY only copies files/directories from build context to container. ADD does the same but also supports URLs and automatic tar extraction. COPY is generally preferred for simplicity and predictability. Use ADD only when you need URL support or auto-extraction.',
      hint: 'COPY is simpler and more transparent. ADD has extra features you may not need.'
    },
    {
      id: 4,
      topic: 'docker',
      question: 'What is the difference between docker run, docker start, and docker exec?',
      explanation: 'docker run creates and starts a new container. docker start starts an existing stopped container. docker exec runs a command inside an already running container without creating a new one. docker run includes pulling image, creating container, and starting it.',
      hint: 'Think about lifecycle: run=create+start, start=resume, exec=command in running container'
    },
    {
      id: 5,
      topic: 'docker',
      question: 'How do you persist data in Docker? Explain volumes and bind mounts',
      explanation: 'Volumes are managed by Docker and stored in /var/lib/docker/volumes. Bind mounts map a host directory to container directory. Volumes are preferred for production as they\'re easier to backup and independent of host path. Use -v for bind mount, --mount for clarity.',
      hint: 'Volumes=managed by Docker, Bind mounts=host directory mapping'
    }
    ,
    {
      id: 31,
      topic: 'docker',
      type: 'mcq',
      difficulty: 'Easy',
      question: 'Which command shows all Docker images on the local machine?',
      options: ['docker ps -a', 'docker images', 'docker container ls', 'docker info'],
      answer: 'docker images',
      explanation: 'The `docker images` command (alias `docker image ls`) lists images stored locally. `docker ps` shows containers, not images.',
      hint: 'Think image vs container listing.',
      source: 'https://docs.docker.com/engine/reference/commandline/images/'
    },
    {
      id: 32,
      topic: 'docker',
      type: 'mcq',
      difficulty: 'Easy',
      question: 'Which flag runs a container in detached mode?',
      options: ['-i', '-t', '-d', '-p'],
      answer: '-d',
      explanation: 'The `-d` flag runs a container in detached mode (in the background). `-i` keeps STDIN open, `-t` allocates a pseudo-TTY, `-p` maps ports.',
      hint: 'Detached = background',
      source: 'https://docs.docker.com/engine/reference/commandline/run/'
    },
    {
      id: 33,
      topic: 'docker',
      type: 'mcq',
      difficulty: 'Easy',
      question: 'What is the primary purpose of a Dockerfile?',
      options: ['Describe runtime configuration only', 'Define a reproducible image build', 'Manage containers at runtime', 'Replace docker-compose.yml'],
      answer: 'Define a reproducible image build',
      explanation: 'A Dockerfile contains instructions to build a Docker image reproducibly (FROM, RUN, COPY, CMD, etc.). It is not a runtime orchestration tool.',
      hint: 'Build-time vs runtime',
      source: 'https://docs.docker.com/engine/reference/builder/'
    },
    {
      id: 34,
      topic: 'docker',
      type: 'mcq',
      difficulty: 'Easy',
      question: 'Which Dockerfile instruction sets the base image for subsequent instructions?',
      options: ['FROM', 'RUN', 'CMD', 'WORKDIR'],
      answer: 'FROM',
      explanation: '`FROM` initializes a new build stage and selects the base image for following instructions. A Dockerfile must begin with a `FROM` (except when using certain parser directives).',
      hint: 'It\'s the first instruction that defines the image origin.',
      source: 'https://docs.docker.com/engine/reference/builder/#from'
    },
    {
      id: 35,
      topic: 'docker',
      type: 'mcq',
      difficulty: 'Medium',
      question: 'Which statement best describes the difference between `CMD` and `ENTRYPOINT` in a Dockerfile?',
      options: ['CMD sets default args; ENTRYPOINT configures container as an executable', 'ENTRYPOINT is ignored if CMD exists', 'CMD runs at build time; ENTRYPOINT runs at runtime', 'They are interchangeable'],
      answer: 'CMD sets default args; ENTRYPOINT configures container as an executable',
      explanation: '`ENTRYPOINT` configures an image to run as an executable; `CMD` provides default arguments to that executable or a default command if ENTRYPOINT is not set. They work together: CMD values are appended to ENTRYPOINT in exec form.',
      hint: 'ENTRYPOINT = executable, CMD = default args',
      source: 'https://docs.docker.com/engine/reference/builder/#entrypoint'
    },
    {
      id: 36,
      topic: 'docker',
      type: 'mcq',
      difficulty: 'Medium',
      question: 'Which technique is recommended to produce smaller, production-ready Docker images?',
      options: ['Use many small RUN layers', 'Use multi-stage builds and minimal base images', 'Always use ADD for downloads', 'Install build tools in final image'],
      answer: 'Use multi-stage builds and minimal base images',
      explanation: 'Multi-stage builds let you build artifacts in a heavier stage and copy only required artifacts into a minimal final image, reducing size and leaving build tools out of the production image.',
      hint: 'Build in one stage, copy final artifacts into another',
      source: 'https://docs.docker.com/develop/develop-images/multistage-build/'
    },
    {
      id: 37,
      topic: 'docker',
      type: 'mcq',
      difficulty: 'Medium',
      question: 'When does Docker use layer cache during build?',
      options: ['Only for RUN instructions', 'When the instruction and its context are unchanged since last build', 'Only for COPY instructions', 'Cache is never used'],
      answer: 'When the instruction and its context are unchanged since last build',
      explanation: 'Docker reuses cached layers when an instruction and the build context that it depends on haven\'t changed. Changing files copied earlier invalidates later cache layers.',
      hint: 'Cache invalidation depends on instruction + inputs',
      source: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache'
    },
    {
      id: 38,
      topic: 'docker',
      type: 'mcq',
      difficulty: 'Medium',
      question: 'What is the purpose of a `.dockerignore` file?',
      options: ['Ignore runtime errors', 'Exclude files from build context to reduce send size and avoid leaking secrets', 'Ignore container logs', 'Disable cache'],
      answer: 'Exclude files from build context to reduce send size and avoid leaking secrets',
      explanation: 'A `.dockerignore` file excludes files and directories from the build context sent to the daemon. This speeds up builds and prevents accidental inclusion of sensitive files.',
      hint: 'Similar to .gitignore but for Docker build context',
      source: 'https://docs.docker.com/build/context/#dockerignore'
    },
    {
      id: 39,
      topic: 'docker',
      type: 'mcq',
      difficulty: 'Medium',
      question: 'Which Dockerfile instruction lets you copy artifacts from a previous build stage?',
      options: ['COPY --from=<stage>', 'ADD --stage=<name>', 'RUN --from=<stage>', 'FROM --copy=<stage>'],
      answer: 'COPY --from=<stage>',
      explanation: '`COPY --from=<stage>` copies files from another build stage (or external image) and is the primary mechanism for multi-stage builds.',
      hint: 'Used to import built binaries from earlier stages',
      source: 'https://docs.docker.com/develop/develop-images/multistage-build/'
    },
    {
      id: 40,
      topic: 'docker',
      type: 'mcq',
      difficulty: 'Medium',
      question: 'What does the `HEALTHCHECK` instruction do in a Dockerfile?',
      options: ['Automatically restarts the container', 'Defines a command to check container health at runtime', 'Exposes a port for health metrics', 'Sets resource limits'],
      answer: 'Defines a command to check container health at runtime',
      explanation: '`HEALTHCHECK` configures a command which Docker runs inside the container to determine its health (healthy/unhealthy) and report status.',
      hint: 'It helps orchestrators know if the container is healthy',
      source: 'https://docs.docker.com/engine/reference/builder/#healthcheck'
    },
    {
      id: 41,
      topic: 'docker',
      type: 'mcq',
      difficulty: 'Advanced',
      question: 'What is the benefit of `RUN --mount=type=cache` when using BuildKit?',
      options: ['It caches build secrets permanently in image', 'Creates a persistent cache mount to speed up package installs without baking cache into final image', 'Mounts network shares', 'Runs builds in parallel automatically'],
      answer: 'Creates a persistent cache mount to speed up package installs without baking cache into final image',
      explanation: 'BuildKit\'s `--mount=type=cache` lets you cache directories (like package manager caches) between builds, improving performance while not adding those caches into image layers.',
      hint: 'Cache at build time, not in final image',
      source: 'https://docs.docker.com/develop/develop-images/build_enhancements/'
    },
    {
      id: 42,
      topic: 'docker',
      type: 'mcq',
      difficulty: 'Advanced',
      question: 'Docker Content Trust (DCT) provides which capability?',
      options: ['Encrypts image layers at rest', 'Verifies image signatures to ensure provenance', 'Scans images for vulnerabilities', 'Automatically patches base images'],
      answer: 'Verifies image signatures to ensure provenance',
      explanation: 'Docker Content Trust enables image signing and verification so you can ensure pulled images come from trusted publishers.',
      hint: 'Think signature verification and provenance',
      source: 'https://docs.docker.com/engine/security/trust/'
    },
    {
      id: 43,
      topic: 'docker',
      type: 'theory',
      difficulty: 'Advanced',
      question: 'Describe steps to run Docker in rootless mode and why you might use it.',
      explanation: 'Rootless mode allows running the Docker daemon and containers without root privileges using user namespaces and helpers. Steps: install prerequisites (newuidmap/newgidmap), enable rootless mode (dockerd-rootless-setuptool.sh or systemd unit), start rootless daemon, use DOCKER_HOST to point CLI. Use rootless to reduce host compromise risk and avoid needing root for container lifecycle.',
      hint: 'User namespaces + dockerd rootless setup',
      source: 'https://docs.docker.com/engine/security/rootless/'
    },
    {
      id: 44,
      topic: 'docker',
      type: 'mcq',
      difficulty: 'Advanced',
      question: 'What is the OCI image specification?',
      options: ['A Docker-only image standard', 'Industry-standard spec for container image formats and runtimes', 'A Kubernetes config schema', 'A proprietary registry protocol'],
      answer: 'Industry-standard spec for container image formats and runtimes',
      explanation: 'The OCI (Open Container Initiative) defines open standards for container image formats and runtimes to ensure interoperability across tooling.',
      hint: 'Open standard initiative for containers',
      source: 'https://opencontainers.org/'
    },
    {
      id: 45,
      topic: 'docker',
      type: 'theory',
      difficulty: 'Advanced',
      question: 'List practical steps to minimize the attack surface of a Docker host and daemon.',
      explanation: 'Recommendations: avoid exposing the Docker daemon socket over TCP; use rootless mode when possible; run containers with least privileges (drop capabilities), use user namespaces, restrict mounts (avoid mounting host /), enable seccomp/AppArmor/SELinux profiles, use signed/trusted images, keep Docker and host OS updated, isolate management interfaces behind VPN/firewall.',
      hint: 'Protect the daemon, reduce privileges, use sandboxing profiles',
      source: 'https://docs.docker.com/engine/security/'
    }
  ],
  kubernetes: [
    {
      id: 6,
      topic: 'kubernetes',
      question: 'What is Kubernetes and why is it needed?',
      explanation: 'Kubernetes is an open-source container orchestration platform. It automates deployment, scaling, and management of containerized applications. K8s handles resource allocation, load balancing, self-healing, rolling updates, and multi-cloud deployment at scale.',
      hint: 'Think about managing thousands of containers across multiple machines.'
    },
    {
      id: 7,
      topic: 'kubernetes',
      question: 'Explain the Kubernetes architecture: Master/Control Plane and Worker Nodes',
      explanation: 'Control Plane (Master): API Server (receives requests), etcd (state storage), Scheduler (assigns pods), Controller Manager (maintains desired state). Worker Nodes: Kubelet (agent running pods), Container Runtime (Docker/containerd), kube-proxy (networking). Nodes communicate with Control Plane via API Server.',
      hint: 'Control Plane manages, Worker Nodes run applications'
    },
    {
      id: 8,
      topic: 'kubernetes',
      question: 'What is a Pod? How is it different from a container?',
      explanation: 'Pod is the smallest deployable unit in Kubernetes, typically running one container but can run multiple. Pods share networking namespace (same IP, ports). Containers within a pod can communicate via localhost. Pods are ephemeral and created/destroyed frequently.',
      hint: 'Container = app instance, Pod = wrapper around container(s)'
    },
    {
      id: 9,
      topic: 'kubernetes',
      question: 'Explain Services in Kubernetes and their types (ClusterIP, NodePort, LoadBalancer)',
      explanation: 'Services expose pods to network. ClusterIP: accessible only within cluster (default). NodePort: exposes on node IP + port (external access). LoadBalancer: creates external load balancer, integrates with cloud providers. Services use selectors to find pods and maintain stable endpoints.',
      hint: 'Services = stable networking for ephemeral pods'
    },
    {
      id: 10,
      topic: 'kubernetes',
      question: 'What is a Deployment and how does it manage Pod replicas?',
      explanation: 'Deployment is a higher-level Kubernetes object that manages ReplicaSets. It defines desired state: replicas, image, ports. K8s maintains specified number of pods. Supports rolling updates, rollbacks, scaling. Preferred way to run stateless applications.',
      hint: 'Deployment → ReplicaSet → Pods'
    }
  ],
  cicd: [
    {
      id: 11,
      topic: 'cicd',
      question: 'What is CI/CD and why is it important?',
      explanation: 'CI (Continuous Integration): frequently merge code, run automated tests. CD (Continuous Deployment): automatically deploy to production. Benefits: faster releases, catch bugs early, consistent deployments, reduced manual errors. Enable rapid, reliable software delivery.',
      hint: 'CI=frequent integration+testing, CD=automated deployment'
    },
    {
      id: 12,
      topic: 'cicd',
      question: 'Explain a typical CI/CD pipeline with stages',
      explanation: 'Common stages: Source (commit trigger) → Build (compile, dependencies) → Test (unit, integration, E2E) → Security (SAST, dependency scan) → Deploy to Staging → Approval → Deploy to Production → Monitoring. Each stage must pass before proceeding.',
      hint: 'Source → Build → Test → Security → Stage → Approve → Prod → Monitor'
    },
    {
      id: 13,
      topic: 'cicd',
      question: 'What is the difference between GitLab CI, GitHub Actions, and Jenkins?',
      explanation: 'Jenkins: self-hosted, highly customizable, requires maintenance. GitHub Actions: cloud-based, easy setup, integrates GitHub, free for public repos. GitLab CI: built into GitLab, easy setup, great container support. Choose based on your platform and infrastructure.',
      hint: 'Jenkins=self-hosted, GitHub Actions=GitHub native, GitLab CI=GitLab native'
    },
    {
      id: 14,
      topic: 'cicd',
      question: 'How do you handle secrets and credentials in CI/CD pipelines?',
      explanation: 'Never hardcode secrets. Use: Environment variables in CI/CD platform, Secret management tools (HashiCorp Vault, AWS Secrets Manager), Encrypted variables, SSH keys for deployment, API tokens with limited scope, Audit logs for access.',
      hint: 'Encrypt, manage centrally, rotate regularly, audit access'
    },
    {
      id: 15,
      topic: 'cicd',
      question: 'Explain blue-green deployment and canary deployment strategies',
      explanation: 'Blue-Green: run two identical environments (blue=current, green=new). Switch traffic after testing. Instant rollback. Zero downtime. Canary: gradually shift traffic to new version. Monitor metrics. If issues, traffic stays on old version. Reduces risk of full rollout.',
      hint: 'Blue-Green=instant switch, Canary=gradual rollout'
    }
  ],
  aws: [
    {
      id: 16,
      topic: 'aws',
      question: 'What is AWS and explain major service categories',
      explanation: 'Amazon Web Services provides cloud computing. Key categories: Compute (EC2, Lambda), Storage (S3, EBS), Database (RDS, DynamoDB), Networking (VPC, CloudFront), Management (CloudWatch, AutoScaling). Choose services based on workload requirements and cost.',
      hint: 'Remember: Compute, Storage, Database, Networking, Management, Security'
    },
    {
      id: 17,
      topic: 'aws',
      question: 'Explain EC2 and key concepts: instances, AMI, security groups, key pairs',
      explanation: 'EC2: virtual servers. AMI: pre-configured OS/software template. Instance: running EC2 from AMI. Security Group: virtual firewall for inbound/outbound traffic. Key Pair: SSH credentials for access. Choose instance type based on CPU, memory, network needs.',
      hint: 'AMI→Instance, Security Groups=firewall, Key Pairs=SSH access'
    },
    {
      id: 18,
      topic: 'aws',
      question: 'What is S3 and explain buckets, objects, and access control?',
      explanation: 'S3: object storage service. Bucket: container for objects (unique name globally). Object: file + metadata. Supports unlimited data. High durability (99.999999999%). Access control: IAM policies, bucket policies, ACLs. Versioning and lifecycle policies supported.',
      hint: 'Bucket=container, Object=file, globally unique bucket names'
    },
    {
      id: 19,
      topic: 'aws',
      question: 'Explain VPC and its components: subnets, internet gateway, NAT gateway',
      explanation: 'VPC: isolated network in AWS. Subnet: range of IPs within VPC (public/private). Internet Gateway: enables internet access. NAT Gateway: allows private resources to access internet (outbound only). Route tables: define traffic direction. Security groups and NACLs: additional security.',
      hint: 'VPC=network, Subnets=segments, IGW=internet access, NAT=NAT translation'
    },
    {
      id: 20,
      topic: 'aws',
      question: 'What is Lambda and how does it enable serverless computing?',
      explanation: 'Lambda: serverless compute service. Upload code, set trigger (API, event, schedule), Lambda runs code when triggered, pay only for execution time. No server management. Auto-scales. Great for event-driven tasks, microservices. Supports multiple languages.',
      hint: 'Write code → set trigger → pay only for execution time'
    }
  ],
  terraform: [
    {
      id: 21,
      topic: 'terraform',
      question: 'What is Terraform and how does it work?',
      explanation: 'Terraform: Infrastructure as Code (IaC) tool by HashiCorp. Write configuration in HCL. Declare desired infrastructure state. Terraform creates, updates, deletes resources. Supports AWS, Azure, GCP, etc. Key files: .tf config, .tfstate (state), .tfplan (execution plan).',
      hint: 'Write desired state → Terraform makes it real'
    },
    {
      id: 22,
      topic: 'terraform',
      question: 'Explain Terraform workflow: init, plan, apply, destroy',
      explanation: 'terraform init: initialize working directory, download providers. terraform plan: show what changes will be made (preview). terraform apply: execute changes, create resources. terraform destroy: delete all managed resources. Use plan before apply to review.',
      hint: 'init→plan→apply→destroy'
    },
    {
      id: 23,
      topic: 'terraform',
      question: 'What is Terraform state and why is it important?',
      explanation: 'State file (.tfstate): tracks all resource IDs and properties. Terraform compares current state with desired state to determine changes. Stores sensitive data (passwords, keys). Must be backed up and protected. Use remote state (S3, Terraform Cloud) in teams.',
      hint: 'State = reality check between code and actual resources'
    },
    {
      id: 24,
      topic: 'terraform',
      question: 'Explain variables, outputs, and modules in Terraform',
      explanation: 'Variables: input values (reusable, parameterized). Outputs: expose values for use outside module. Modules: reusable packages of resources. Structure: root module contains variables → child modules implement logic → outputs expose results. Improves maintainability and reusability.',
      hint: 'Variables=input, Outputs=export, Modules=reusable packages'
    },
    {
      id: 25,
      topic: 'terraform',
      question: 'How do you manage Terraform state in a team environment?',
      explanation: 'Use remote state: S3, Azure Storage, Terraform Cloud. Benefits: centralized, shared, versioned, locked. Enable state locking (DynamoDB with S3). Use backend configuration. Secrets must be encrypted. Use terraform workspaces for environments. CI/CD automation.',
      hint: 'Remote state + locking + backend configuration'
    }
  ],
  monitoring: [
    {
      id: 26,
      topic: 'monitoring',
      question: 'What is the importance of monitoring and logging in production systems?',
      explanation: 'Monitoring: track system metrics (CPU, memory, latency). Detect issues before they impact users. Logging: record system events and errors. Essential for: debugging, compliance, security, performance optimization, SLA tracking. Together enable proactive operations.',
      hint: 'Monitor=health check, Logging=investigation'
    },
    {
      id: 27,
      topic: 'monitoring',
      question: 'Explain metrics, logs, and traces - the three pillars of observability',
      explanation: 'Metrics: quantitative measurements (CPU%, response time). Logs: text records of events. Traces: request flow across services. Together provide observability: understand system behavior. Tools: Prometheus (metrics), ELK Stack (logs), Jaeger (traces). Essential for microservices.',
      hint: 'Metrics=numbers, Logs=text, Traces=flow'
    },
    {
      id: 28,
      topic: 'monitoring',
      question: 'What is Prometheus and how does it work?',
      explanation: 'Prometheus: open-source monitoring system. Scrapes metrics from endpoints (/metrics). Stores time-series data. Supports alerting (AlertManager). Query language: PromQL. Handles high cardinality well. Commonly paired with Grafana for visualization.',
      hint: 'Scrape → Store → Alert → Visualize'
    },
    {
      id: 29,
      topic: 'monitoring',
      question: 'Explain the ELK Stack and its components: Elasticsearch, Logstash, Kibana',
      explanation: 'Elasticsearch: search and analytics engine, stores logs. Logstash: collects, parses, transforms logs from various sources. Kibana: visualization and exploration. Workflow: Applications → Logstash → Elasticsearch → Kibana. Alternative: Filebeat (lightweight shipper).',
      hint: 'Logstash=input, Elasticsearch=storage, Kibana=visualization'
    },
    {
      id: 30,
      topic: 'monitoring',
      question: 'What are SLIs, SLOs, and SLAs? Why do they matter?',
      explanation: 'SLI (Service Level Indicator): measurable metric (e.g., 99.9% uptime, <200ms latency). SLO (Service Level Objective): target SLI (e.g., maintain 99.9% uptime). SLA (Service Level Agreement): commitment with consequences for failure. Together define reliability expectations and drive operational priorities.',
      hint: 'SLI=metric, SLO=target, SLA=commitment'
    }
  ]
};

// ==================== State Management ====================
let appState = {
  currentPage: 'home',
  currentTopic: 'all',
  currentChallenge: null,
  currentChallengeIndex: 0,
  visibleChallenges: [],
  bookmarks: [],
  answers: {},
  solvedQuestions: new Set(),
  lastUpdated: new Date().toLocaleDateString(),
  darkMode: localStorage.getItem('darkMode') === 'true',
  streakDays: parseInt(localStorage.getItem('streakDays')) || 0,
  lastActivityDate: localStorage.getItem('lastActivityDate') || null
};

// ==================== Local Storage Management ====================
function saveState() {
  const stateToSave = {
    bookmarks: appState.bookmarks,
    answers: appState.answers,
    solvedQuestions: Array.from(appState.solvedQuestions),
    streakDays: appState.streakDays,
    lastActivityDate: appState.lastActivityDate,
    darkMode: appState.darkMode
  };
  localStorage.setItem('appState', JSON.stringify(stateToSave));
}

function loadState() {
  const saved = localStorage.getItem('appState');
  if (saved) {
    const loaded = JSON.parse(saved);
    appState.bookmarks = loaded.bookmarks || [];
    appState.answers = loaded.answers || {};
    appState.solvedQuestions = new Set(loaded.solvedQuestions || []);
    appState.streakDays = loaded.streakDays || 0;
    appState.lastActivityDate = loaded.lastActivityDate;
    appState.darkMode = loaded.darkMode || false;
  }
  updateStreak();
  if (appState.darkMode) {
    document.body.classList.add('dark-mode');
  }
}

function updateStreak() {
  const today = new Date().toLocaleDateString();
  if (appState.lastActivityDate !== today) {
    if (appState.lastActivityDate === new Date(Date.now() - 86400000).toLocaleDateString()) {
      appState.streakDays++;
    } else if (appState.lastActivityDate !== today) {
      appState.streakDays = 1;
    }
    appState.lastActivityDate = today;
    saveState();
  }
}

// ==================== UI Navigation ====================
function goToPage(pageName) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageName).classList.add('active');

  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  document.querySelector(`[data-page="${pageName}"]`).classList.add('active');

  appState.currentPage = pageName;
  
  if (pageName === 'progress') updateProgressPage();
  if (pageName === 'bookmarks') updateBookmarksPage();
  if (pageName === 'home') updateHomePage();
  if (pageName === 'challenges') initializeChallengesPage();
}

function updateHomePage() {
  document.getElementById('totalSolved').textContent = appState.solvedQuestions.size;
  document.getElementById('totalBookmarks').textContent = appState.bookmarks.length;
  document.getElementById('streakDays').textContent = appState.streakDays;
  const total = Object.values(challengesDatabase).reduce((sum, arr) => sum + arr.length, 0);
  const percentage = Math.round((appState.solvedQuestions.size / total) * 100);
  document.getElementById('completionRate').textContent = percentage;
}

// ==================== Challenges Page ====================
function initializeChallengesPage() {
  setupFilterButtons();
  setupQuestionsList();
  generateNewChallenge();
}

function setupFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      appState.currentTopic = e.target.dataset.filter;
      filterChallenges();
      setupQuestionsList();
    });
  });
}

function filterChallenges() {
  if (appState.currentTopic === 'all') {
    appState.visibleChallenges = Object.values(challengesDatabase).flat();
  } else {
    appState.visibleChallenges = challengesDatabase[appState.currentTopic] || [];
  }
  appState.currentChallengeIndex = 0;
}

function generateNewChallenge() {
  // Show loading animation
  const challengeText = document.getElementById('challengeText');
  challengeText.style.opacity = '0.5';
  challengeText.style.animation = 'spin 0.5s ease-in-out';
  
  filterChallenges();
  if (appState.visibleChallenges.length === 0) return;

  appState.currentChallengeIndex = Math.floor(Math.random() * appState.visibleChallenges.length);
  appState.currentChallenge = appState.visibleChallenges[appState.currentChallengeIndex];
  
  setTimeout(() => {
    challengeText.style.opacity = '1';
    challengeText.style.animation = '';
    displayChallenge();
    updateQuestionsList();
  }, 300);
}

function displayChallenge() {
  const challenge = appState.currentChallenge;
  document.getElementById('challengeText').textContent = challenge.question;
  document.getElementById('topicBadge').textContent = challenge.topic.charAt(0).toUpperCase() + challenge.topic.slice(1);
  document.getElementById('explanationText').textContent = challenge.explanation;
  
  const answerInput = document.getElementById('answerInput');
  answerInput.value = appState.answers[challenge.id] || '';
  
  const bookmarkBtn = document.getElementById('bookmarkBtn');
  const isBookmarked = appState.bookmarks.some(b => b.id === challenge.id);
  bookmarkBtn.classList.toggle('bookmarked', isBookmarked);
  bookmarkBtn.innerHTML = isBookmarked ? '<i class="fas fa-bookmark"></i>' : '<i class="far fa-bookmark"></i>';

  answerInput.placeholder = 'Write your detailed answer here...';
}

function setupQuestionsList() {
  const list = document.getElementById('questionsList');
  list.innerHTML = '';

  appState.visibleChallenges.forEach((challenge, index) => {
    const item = document.createElement('div');
    item.className = 'question-item';
    if (challenge.id === appState.currentChallenge?.id) item.classList.add('active');
    if (appState.solvedQuestions.has(challenge.id)) item.style.opacity = '0.7';

    item.innerHTML = `
      <div style="display: flex; gap: 0.5rem; align-items: start;">
        ${appState.solvedQuestions.has(challenge.id) ? '<i class="fas fa-check" style="color: #00c896; margin-top: 2px;"></i>' : ''}
        <span>${challenge.question.substring(0, 50)}...</span>
      </div>
    `;
    
    item.addEventListener('click', () => {
      appState.currentChallengeIndex = index;
      appState.currentChallenge = challenge;
      displayChallenge();
      updateQuestionsList();
    });
    
    list.appendChild(item);
  });
}

function updateQuestionsList() {
  document.querySelectorAll('.question-item').forEach((item, idx) => {
    item.classList.remove('active');
    if (idx === appState.currentChallengeIndex) item.classList.add('active');
  });
}

// ==================== Answer Management ====================
document.addEventListener('DOMContentLoaded', () => {
  loadState();

  // Generate Challenge
  document.getElementById('generateBtn').addEventListener('click', generateNewChallenge);

  // Bookmark
  document.getElementById('bookmarkBtn').addEventListener('click', () => {
    const challenge = appState.currentChallenge;
    const isBookmarked = appState.bookmarks.some(b => b.id === challenge.id);
    const btn = document.getElementById('bookmarkBtn');
    
    // Add bounce animation
    btn.style.animation = 'bounce 0.4s ease-in-out';
    
    if (isBookmarked) {
      appState.bookmarks = appState.bookmarks.filter(b => b.id !== challenge.id);
      showFeedback('📌 Question removed from bookmarks');
    } else {
      appState.bookmarks.push(challenge);
      showFeedback('📌 Question bookmarked! You can review it later');
    }
    
    setTimeout(() => {
      btn.style.animation = '';
      saveState();
      displayChallenge();
      updateHomePage();
    }, 400);
  });

  // Show Hint
  document.getElementById('showHintBtn').addEventListener('click', () => {
    const challenge = appState.currentChallenge;
    alert(`💡 Hint: ${challenge.hint}`);
  });

  // Save Answer
  document.getElementById('saveAnswerBtn').addEventListener('click', () => {
    const answer = document.getElementById('answerInput').value.trim();
    const btn = document.getElementById('saveAnswerBtn');
    
    // Add button animation
    btn.style.animation = 'bounce 0.4s ease-in-out';
    
    if (answer) {
      appState.answers[appState.currentChallenge.id] = answer;
      saveState();
      showFeedback('✅ Answer saved successfully!');
    } else {
      showFeedback('⚠️ Please write an answer first!');
    }
    
    setTimeout(() => {
      btn.style.animation = '';
    }, 400);
  });

  // Clear Answer
  document.getElementById('clearAnswerBtn').addEventListener('click', () => {
    if (confirm('Clear your answer?')) {
      document.getElementById('answerInput').value = '';
      delete appState.answers[appState.currentChallenge.id];
      saveState();
    }
  });

  // Mark Solved
  document.getElementById('markSolvedBtn').addEventListener('click', () => {
    const answer = document.getElementById('answerInput').value.trim();
    if (!answer) {
      showFeedback('⚠️ Write an answer before marking as solved!');
      return;
    }
    
    appState.solvedQuestions.add(appState.currentChallenge.id);
    appState.answers[appState.currentChallenge.id] = answer;
    saveState();
    updateStreak();
    
    // Add celebration effect
    celebrateSuccess();
    showFeedback('🎉 Awesome! Question marked as solved!');
    updateQuestionsList();
    updateHomePage();
    
    setTimeout(() => generateNewChallenge(), 1500);
  });

  // Search Questions
  document.getElementById('questionSearch').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.question-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? '' : 'none';
    });
  });

  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Add ripple effect
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255,255,255,0.5)';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple-animation 0.6s ease-out';
      
      goToPage(link.dataset.page);
    });
  });

  // Topic boxes
  document.querySelectorAll('.topic-box').forEach(box => {
    box.addEventListener('click', () => {
      // Add pulse effect
      box.style.animation = 'pulse 0.5s ease-in-out';
      setTimeout(() => {
        box.style.animation = '';
        goToPage('challenges');
        const topic = box.dataset.topic;
        appState.currentTopic = topic;
        document.querySelectorAll('.filter-btn').forEach(btn => {
          btn.classList.remove('active');
          if (btn.dataset.filter === topic) btn.classList.add('active');
        });
        filterChallenges();
        setupQuestionsList();
        generateNewChallenge();
      }, 500);
    });
  });

  // Bookmarks Page
  document.getElementById('bookmarkSearch').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.bookmark-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? '' : 'none';
    });
  });

  document.getElementById('clearAllBookmarks').addEventListener('click', () => {
    if (confirm('Clear all bookmarks?')) {
      appState.bookmarks = [];
      saveState();
      updateBookmarksPage();
      updateHomePage();
    }
  });

  // Settings
  document.getElementById('exportDataBtn').addEventListener('click', exportData);
  document.getElementById('importDataBtn').addEventListener('click', () => {
    document.getElementById('importFile').click();
  });
  document.getElementById('importFile').addEventListener('change', importData);
  document.getElementById('resetDataBtn').addEventListener('click', resetAllData);
  
  document.getElementById('darkModeToggle').addEventListener('change', (e) => {
    appState.darkMode = e.target.checked;
    document.body.classList.toggle('dark-mode', appState.darkMode);
    saveState();
  });

  document.getElementById('darkModeToggle').checked = appState.darkMode;

  // Initialize
  createParticles(); // Create floating particles
  updateHomePage();
});

function showFeedback(message) {
  const feedback = document.getElementById('answerFeedback');
  feedback.textContent = message;
  feedback.classList.add('show');
  
  // Add bounce animation
  feedback.style.animation = 'none';
  setTimeout(() => {
    feedback.style.animation = 'bounce 0.5s ease-in-out';
  }, 10);
  
  // Determine if error
  if (message.includes('⚠️') || message.includes('Error')) {
    feedback.classList.add('error');
  } else {
    feedback.classList.remove('error');
  }
  
  setTimeout(() => feedback.classList.remove('show'), 3000);
}

// ==================== Bookmarks Page ====================
function updateBookmarksPage() {
  const list = document.getElementById('bookmarksList');
  
  if (appState.bookmarks.length === 0) {
    list.innerHTML = '<p class="empty-message">No bookmarked questions yet. Start bookmarking!</p>';
    return;
  }

  list.innerHTML = appState.bookmarks.map(bookmark => `
    <div class="bookmark-item">
      <div class="bookmark-header">
        <span class="bookmark-topic">${bookmark.topic.toUpperCase()}</span>
        <button class="btn btn-icon" onclick="removeBookmark(${bookmark.id})" title="Remove">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <p class="bookmark-question">${bookmark.question}</p>
      ${appState.answers[bookmark.id] ? `
        <div class="bookmark-answer">
          <strong>Your Answer:</strong><br>${appState.answers[bookmark.id]}
        </div>
      ` : '<p style="color: var(--text-light); font-style: italic;">No answer saved yet</p>'}
      <div class="bookmark-actions">
        <button class="btn btn-primary" onclick="reviewBookmark(${bookmark.id})">
          <i class="fas fa-edit"></i> Review
        </button>
        <button class="btn btn-success" onclick="markBookmarkSolved(${bookmark.id})">
          <i class="fas fa-check"></i> Solve
        </button>
      </div>
    </div>
  `).join('');
}

function removeBookmark(id) {
  appState.bookmarks = appState.bookmarks.filter(b => b.id !== id);
  saveState();
  updateBookmarksPage();
  updateHomePage();
}

function reviewBookmark(id) {
  goToPage('challenges');
  const challenge = Object.values(challengesDatabase).flat().find(c => c.id === id);
  appState.currentChallenge = challenge;
  displayChallenge();
}

function markBookmarkSolved(id) {
  appState.solvedQuestions.add(id);
  saveState();
  updateBookmarksPage();
  updateHomePage();
}

// ==================== Progress Page ====================
function updateProgressPage() {
  const total = Object.values(challengesDatabase).reduce((sum, arr) => sum + arr.length, 0);
  const completed = appState.solvedQuestions.size;
  const percentage = Math.round((completed / total) * 100);

  document.getElementById('progressPercent').textContent = `${percentage}%`;
  document.querySelector('.progress-fill').style.width = `${percentage}%`;
  document.querySelector('.progress-fill').textContent = `${percentage}%`;

  document.getElementById('totalChallenges').textContent = total;
  document.getElementById('completedCount').textContent = completed;
  document.getElementById('inProgressCount').textContent = Object.keys(appState.answers).length;
  document.getElementById('currentStreak').textContent = `${appState.streakDays} days`;

  // Topics Progress
  const topicProgressList = document.getElementById('topicProgressList');
  topicProgressList.innerHTML = Object.entries(challengesDatabase).map(([topic, questions]) => {
    const topicSolved = questions.filter(q => appState.solvedQuestions.has(q.id)).length;
    const topicPercentage = Math.round((topicSolved / questions.length) * 100);
    
    return `
      <div class="topic-progress-item">
        <div class="topic-name">${topic.charAt(0).toUpperCase() + topic.slice(1)}</div>
        <div class="topic-bar">
          <div class="topic-bar-fill" style="width: ${topicPercentage}%">
            ${topicPercentage > 5 ? `${topicPercentage}%` : ''}
          </div>
        </div>
        <div class="topic-completed">${topicSolved}/${questions.length}</div>
      </div>
    `;
  }).join('');

  // Activity
  const activityList = document.getElementById('activityList');
  if (appState.solvedQuestions.size === 0) {
    activityList.innerHTML = '<p class="empty-message">No activity yet. Start solving!</p>';
  } else {
    activityList.innerHTML = `
      <div class="activity-item">
        <strong>${appState.solvedQuestions.size} questions solved</strong><br>
        <span class="activity-time">Last activity: ${appState.lastActivityDate}</span>
      </div>
      <div class="activity-item">
        <strong>Current Streak: ${appState.streakDays} days</strong><br>
        <span class="activity-time">Keep it up! 🔥</span>
      </div>
    `;
  }
}

// ==================== Data Management ====================
function exportData() {
  const data = {
    bookmarks: appState.bookmarks,
    answers: appState.answers,
    solvedQuestions: Array.from(appState.solvedQuestions),
    streakDays: appState.streakDays,
    exportDate: new Date().toISOString()
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `devops-academy-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  alert('✅ Data exported successfully!');
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result);
      appState.bookmarks = imported.bookmarks || [];
      appState.answers = imported.answers || {};
      appState.solvedQuestions = new Set(imported.solvedQuestions || []);
      appState.streakDays = imported.streakDays || 0;
      saveState();
      alert('✅ Data imported successfully!');
      updateHomePage();
      document.getElementById('importFile').value = '';
    } catch (error) {
      alert('❌ Error importing file. Make sure it\'s valid JSON.');
    }
  };
  reader.readAsText(file);
}

function resetAllData() {
  if (confirm('⚠️ This will delete ALL your data (bookmarks, answers, progress). Are you sure?')) {
    if (confirm('Are you REALLY sure? This cannot be undone!')) {
      appState.bookmarks = [];
      appState.answers = {};
      appState.solvedQuestions = new Set();
      appState.streakDays = 0;
      appState.lastActivityDate = null;
      saveState();
      alert('✅ All data reset!');
      location.reload();
    }
  }
}

// ==================== Content Management System ====================

// Sample Interview Questions Data
const interviewQuestions = [
  {
    id: 1,
    title: "What is Docker and why use it?",
    category: "docker",
    difficulty: "easy",
    description: "Understand containerization concepts and Docker's role in DevOps",
    tags: ["Docker", "Containerization", "Basics"],
    views: 2543,
    rating: 4.8
  },
  {
    id: 2,
    title: "Explain Kubernetes architecture",
    category: "kubernetes",
    difficulty: "hard",
    description: "Deep dive into Kubernetes components and cluster architecture",
    tags: ["Kubernetes", "Orchestration", "Architecture"],
    views: 1892,
    rating: 4.9
  },
  {
    id: 3,
    title: "How do you structure CI/CD pipelines?",
    category: "devops",
    difficulty: "medium",
    description: "Best practices for designing scalable CI/CD pipelines",
    tags: ["CI/CD", "Pipeline", "Automation"],
    views: 2156,
    rating: 4.7
  },
  {
    id: 4,
    title: "AWS IAM roles and policies explained",
    category: "aws",
    difficulty: "medium",
    description: "Understanding AWS identity and access management",
    tags: ["AWS", "Security", "IAM"],
    views: 1745,
    rating: 4.6
  },
  {
    id: 5,
    title: "What is Infrastructure as Code (IaC)?",
    category: "general",
    difficulty: "easy",
    description: "Principles and benefits of managing infrastructure through code",
    tags: ["IaC", "Terraform", "Automation"],
    views: 1523,
    rating: 4.5
  },
  {
    id: 6,
    title: "Microservices vs Monolithic architecture",
    category: "general",
    difficulty: "medium",
    description: "Compare and contrast different application architecture patterns",
    tags: ["Architecture", "Microservices", "Design"],
    views: 2234,
    rating: 4.8
  }
  ,
  // ---- Additional Docker-focused interview questions (IDs 101-150) ----
  {
    id: 101,
    category: 'docker',
    type: 'mcq',
    difficulty: 'easy',
    question: 'Which command lists running containers?',
    options: ['docker ps', 'docker images', 'docker run', 'docker start'],
    answer: 'docker ps',
    explanation: '`docker ps` lists running containers. Use `docker ps -a` to list all containers including stopped ones.',
    hint: 'Think about listing containers currently active',
    source: 'https://docs.docker.com/engine/reference/commandline/ps/'
  },
  {
    id: 102,
    category: 'docker',
    type: 'mcq',
    difficulty: 'easy',
    question: 'Which command builds an image from a Dockerfile?',
    options: ['docker build', 'docker compose', 'docker run', 'docker commit'],
    answer: 'docker build',
    explanation: '`docker build` reads a Dockerfile and creates an image from the instructions.',
    hint: 'Build = create image from Dockerfile',
    source: 'https://docs.docker.com/engine/reference/commandline/build/'
  },
  {
    id: 103,
    category: 'docker',
    type: 'mcq',
    difficulty: 'easy',
    question: 'What does `docker run -p 8080:80` do?',
    options: ['Maps container port 8080 to host 80', 'Maps host port 8080 to container port 80', 'Runs container interactively', 'Stops container after exit'],
    answer: 'Maps host port 8080 to container port 80',
    explanation: 'The format `-p hostPort:containerPort` maps hostPort to containerPort allowing external access.',
    hint: 'host:container ordering',
    source: 'https://docs.docker.com/engine/reference/commandline/run/'
  },
  {
    id: 104,
    category: 'docker',
    type: 'mcq',
    difficulty: 'easy',
    question: 'Which file excludes files from Docker build context?',
    options: ['.dockerignore', '.gitignore', 'Dockerfile', '.ignore'],
    answer: '.dockerignore',
    explanation: '`.dockerignore` prevents files from being sent to the daemon during `docker build`.',
    hint: 'Similar to .gitignore but for Docker builds',
    source: 'https://docs.docker.com/build/context/#dockerignore'
  },
  {
    id: 105,
    category: 'docker',
    type: 'mcq',
    difficulty: 'easy',
    question: 'Which instruction in a Dockerfile sets environment variables?',
    options: ['ENV', 'ARG', 'RUN', 'SETENV'],
    answer: 'ENV',
    explanation: '`ENV` sets environment variables in the image and persists into the container environment.',
    hint: 'ENV is for persistent env vars',
    source: 'https://docs.docker.com/engine/reference/builder/#env'
  },
  {
    id: 106,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is a multi-stage build used for?',
    options: ['To debug containers', 'To reduce final image size by copying artifacts from build stages', 'To run multiple containers', 'To enable networking features'],
    answer: 'To reduce final image size by copying artifacts from build stages',
    explanation: 'Multi-stage builds allow building artifacts in intermediate stages and copying only required artifacts into the final minimal image.',
    hint: 'Build -> copy only final artifacts',
    source: 'https://docs.docker.com/develop/develop-images/multistage-build/'
  },
  {
    id: 107,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'Which instruction is preferred for copying files from build context into image?',
    options: ['ADD', 'COPY', 'MOVE', 'FETCH'],
    answer: 'COPY',
    explanation: '`COPY` is preferred because it is more transparent; `ADD` has extra behavior (URL, tar extraction).',
    hint: 'Use the simpler option unless extra features needed',
    source: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#add-or-copy'
  },
  {
    id: 108,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What does `docker image prune` do?',
    options: ['Removes stopped containers', 'Removes unused images', 'Removes volumes', 'Removes networks'],
    answer: 'Removes unused images',
    explanation: '`docker image prune` removes dangling (unused) images to free disk space.',
    hint: 'Prune = clean up unused images',
    source: 'https://docs.docker.com/engine/reference/commandline/image_prune/'
  },
  {
    id: 109,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'Which storage driver is commonly used on modern Linux distributions?',
    options: ['aufs', 'overlay2', 'devicemapper', 'vfs'],
    answer: 'overlay2',
    explanation: '`overlay2` is the default and recommended storage driver for many Linux distributions due to efficiency and performance.',
    hint: 'Overlay filesystem',
    source: 'https://docs.docker.com/storage/storagedriver/'
  },
  {
    id: 110,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is the function of Docker volumes?',
    options: ['Share network across containers', 'Persist and share data outside container lifecycle', 'Isolate CPU limits', 'Provide container encryption'],
    answer: 'Persist and share data outside container lifecycle',
    explanation: 'Volumes are the preferred way to persist data and share it between containers without depending on container filesystem.',
    hint: 'Data survives container removal',
    source: 'https://docs.docker.com/storage/volumes/'
  },
  {
    id: 111,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'Which command shows image history and layers?',
    options: ['docker history <image>', 'docker inspect <image>', 'docker layers <image>', 'docker info'],
    answer: 'docker history <image>',
    explanation: '`docker history` shows the image layers and commands that created them.',
    hint: 'History shows build steps',
    source: 'https://docs.docker.com/engine/reference/commandline/history/'
  },
  {
    id: 112,
    category: 'docker',
    type: 'mcq',
    difficulty: 'hard',
    question: 'What is the purpose of `HEALTHCHECK` in a Dockerfile?',
    options: ['Set resource limits', 'Define a command run inside container to determine health', 'Expose metrics endpoint', 'Restart policy'],
    answer: 'Define a command run inside container to determine health',
    explanation: '`HEALTHCHECK` configures a runtime health probe which reports container health to the engine.',
    hint: 'Useful for orchestrators to detect unhealthy containers',
    source: 'https://docs.docker.com/engine/reference/builder/#healthcheck'
  },
  {
    id: 113,
    category: 'docker',
    type: 'mcq',
    difficulty: 'hard',
    question: 'How does Docker Content Trust improve security?',
    options: ['Encrypts images on disk', 'Verifies signed images to ensure provenance', 'Runs images in a sandbox', 'Scans for vulnerabilities automatically'],
    answer: 'Verifies signed images to ensure provenance',
    explanation: 'Docker Content Trust adds image signing and verification to ensure images are from trusted sources.',
    hint: 'Think signatures and trust',
    source: 'https://docs.docker.com/engine/security/trust/'
  },
  {
    id: 114,
    category: 'docker',
    type: 'mcq',
    difficulty: 'hard',
    question: 'What is the advantage of BuildKit over the legacy builder?',
    options: ['Slower builds', 'Advanced cache mounts, parallelism, better performance', 'Removes support for multi-stage builds', 'Does not support .dockerignore'],
    answer: 'Advanced cache mounts, parallelism, better performance',
    explanation: 'BuildKit adds features such as `--mount=type=cache`, parallelism, and performance improvements.',
    hint: 'BuildKit brings modern enhancements',
    source: 'https://docs.docker.com/develop/develop-images/build_enhancements/'
  },
  {
    id: 115,
    category: 'docker',
    type: 'mcq',
    difficulty: 'hard',
    question: 'Which of these reduces layer cache invalidation risk?',
    options: ['Run `apt-get update` and install in separate RUN steps', 'Place COPY of frequently changing files early', 'Order RUN commands to install dependencies before copying source', 'Use ADD for everything'],
    answer: 'Order RUN commands to install dependencies before copying source',
    explanation: 'Copying source later and installing dependencies earlier prevents frequent source changes from invalidating earlier cached layers.',
    hint: 'Keep frequently changing files after expensive steps',
    source: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/'
  },
  {
    id: 116,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'Which command pushes an image to a registry?',
    options: ['docker push', 'docker publish', 'docker registry push', 'docker save'],
    answer: 'docker push',
    explanation: '`docker push` uploads a local image to a remote registry (e.g., Docker Hub).',
    hint: 'Push = upload',
    source: 'https://docs.docker.com/engine/reference/commandline/push/'
  },
  {
    id: 117,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is the effect of `--rm` when running a container?',
    options: ['Removes image after run', 'Automatically removes container on exit', 'Restarts container on failure', 'Runs container in read-only mode'],
    answer: 'Automatically removes container on exit',
    explanation: '`--rm` instructs Docker to remove the container filesystem when the container exits.',
    hint: 'Temporary container',
    source: 'https://docs.docker.com/engine/reference/commandline/run/'
  },
  {
    id: 118,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'Which networking driver allows containers to communicate across multiple Docker daemons using overlay networks?',
    options: ['bridge', 'host', 'overlay', 'macvlan'],
    answer: 'overlay',
    explanation: 'Overlay networks span multiple Docker hosts and are used with Swarm or other orchestrators to create multi-host networks.',
    hint: 'Overlay = multi-host networking',
    source: 'https://docs.docker.com/network/overlay/'
  },
  {
    id: 119,
    category: 'docker',
    type: 'mcq',
    difficulty: 'hard',
    question: 'Explain purpose of `docker system prune`.',
    options: ['Removes everything (unused images, containers, networks, build cache)', 'Removes only stopped containers', 'Only prunes volumes', 'Upgrades Docker system components'],
    answer: 'Removes everything (unused images, containers, networks, build cache)',
    explanation: '`docker system prune` removes unused data including containers, images, networks, and optionally volumes to free space.',
    hint: 'System-wide cleanup',
    source: 'https://docs.docker.com/engine/reference/commandline/system_prune/'
  },
  {
    id: 120,
    category: 'docker',
    type: 'theory',
    difficulty: 'hard',
    question: 'Describe user namespaces and how they improve container security.',
    explanation: 'User namespaces map container UIDs to different host UIDs so root inside a container is not root on the host, reducing risk of privilege escalation. Enable with daemon/user namespace remapping or rootless mode.',
    hint: 'UID mapping between container and host',
    source: 'https://docs.docker.com/engine/security/userns-remap/'
  },
  {
    id: 121,
    category: 'docker',
    type: 'mcq',
    difficulty: 'hard',
    question: 'Which of these is a recommended security practice for containers?',
    options: ['Run everything as root', 'Expose Docker socket to containers', 'Drop unnecessary Linux capabilities', 'Allow privileged mode by default'],
    answer: 'Drop unnecessary Linux capabilities',
    explanation: 'Reducing capabilities and running processes as non-root minimizes the attack surface.',
    hint: 'Least privilege principle',
    source: 'https://docs.docker.com/engine/security/security/'
  },
  {
    id: 122,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'How can secrets be provided to builds without baking them into images (BuildKit)?',
    options: ['Use ENV with plaintext', 'Use RUN --mount=type=secret', 'ADD secret.txt /', 'COPY secret /secret'],
    answer: 'Use RUN --mount=type=secret',
    explanation: 'BuildKit supports `--mount=type=secret` which makes secret data available at build-time without including it in the resulting image layers.',
    hint: 'BuildKit secrets mount',
    source: 'https://docs.docker.com/develop/develop-images/build_enhancements/#new-dockerfile-features'
  },
  {
    id: 123,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What does `docker-compose up --build` do?',
    options: ['Builds images then starts services', 'Only builds images', 'Only starts existing containers', 'Removes containers after exit'],
    answer: 'Builds images then starts services',
    explanation: 'The `--build` flag forces images to be rebuilt before creating containers.',
    hint: 'Compose with build flag',
    source: 'https://docs.docker.com/compose/reference/up/'
  },
  {
    id: 124,
    category: 'docker',
    type: 'mcq',
    difficulty: 'easy',
    question: 'Which command shows detailed object metadata for an image or container?',
    options: ['docker inspect', 'docker details', 'docker info', 'docker meta'],
    answer: 'docker inspect',
    explanation: '`docker inspect` returns low-level information in JSON for images, containers, volumes, and networks.',
    hint: 'Inspect for metadata',
    source: 'https://docs.docker.com/engine/reference/commandline/inspect/'
  },
  {
    id: 125,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is the default bridge network called?',
    options: ['bridge', 'default', 'docker0', 'nat'],
    answer: 'bridge',
    explanation: 'Docker creates a default bridge network named `bridge` for containers unless otherwise specified.',
    hint: 'Common bridge network name',
    source: 'https://docs.docker.com/network/bridge/'
  },
  {
    id: 126,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'Which command saves an image to a tar archive?',
    options: ['docker save', 'docker export', 'docker archive', 'docker snapshot'],
    answer: 'docker save',
    explanation: '`docker save` writes an image (and its tags) to a tar archive. `docker export` is for containers.',
    hint: 'Save = image, Export = container filesystem',
    source: 'https://docs.docker.com/engine/reference/commandline/save/'
  },
  {
    id: 127,
    category: 'docker',
    type: 'mcq',
    difficulty: 'hard',
    question: 'Why avoid mounting `/var/run/docker.sock` into containers?',
    options: ['It is read-only', 'It grants control of the Docker daemon leading to privilege escalation', 'It improves performance', 'It enables networking features'],
    answer: 'It grants control of the Docker daemon leading to privilege escalation',
    explanation: 'Exposing the Docker socket gives a container effective control over the host Docker daemon and can lead to host compromise.',
    hint: 'Socket access = powerful privileges',
    source: 'https://docs.docker.com/engine/security/#docker-daemon-attack-surface'
  },
  {
    id: 128,
    category: 'docker',
    type: 'theory',
    difficulty: 'hard',
    question: 'Explain how overlay networks implement multi-host communication.',
    explanation: 'Overlay networks encapsulate container networking traffic and route it across hosts using VXLAN or similar tunnels, allowing containers on different hosts to appear on the same L2 network. Swarm or other orchestrators manage the overlay endpoints and routing mesh.',
    hint: 'Encapsulation + routing across hosts',
    source: 'https://docs.docker.com/network/overlay/'
  },
  {
    id: 129,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'Which restart policy will always restart a container unless stopped manually?',
    options: ['no', 'on-failure', 'always', 'unless-stopped'],
    answer: 'always',
    explanation: '`always` restarts containers regardless of exit status. `unless-stopped` behaves similarly but not after manual stop.',
    hint: 'Always = relentless restart',
    source: 'https://docs.docker.com/engine/reference/commandline/run/#restart-policies---restart'
  },
  {
    id: 130,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What does `docker logs --follow` do?',
    options: ['Deletes logs', 'Streams logs in real time similar to tail -f', 'Archives logs', 'Shows logs once then exits'],
    answer: 'Streams logs in real time similar to tail -f',
    explanation: '`--follow` streams container logs to the console as they are produced.',
    hint: 'Follow = tail -f',
    source: 'https://docs.docker.com/engine/reference/commandline/logs/'
  },
  {
    id: 131,
    category: 'docker',
    type: 'mcq',
    difficulty: 'hard',
    question: 'What is seccomp and why is it used with Docker?',
    options: ['A container logging driver', 'A kernel facility to filter syscalls for sandboxing', 'A network plugin', 'A storage driver'],
    answer: 'A kernel facility to filter syscalls for sandboxing',
    explanation: 'Seccomp restricts permitted system calls, reducing attack surface by preventing dangerous syscalls inside containers.',
    hint: 'System call filtering',
    source: 'https://docs.docker.com/engine/security/seccomp/'
  },
  {
    id: 132,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'Which command inspects running container processes?',
    options: ['docker top <container>', 'docker ps', 'docker exec ps', 'docker stats'],
    answer: 'docker top <container>',
    explanation: '`docker top` lists processes running inside a container similar to `ps` output.',
    hint: 'Top = processes',
    source: 'https://docs.docker.com/engine/reference/commandline/top/'
  },
  {
    id: 133,
    category: 'docker',
    type: 'mcq',
    difficulty: 'easy',
    question: 'Which command removes stopped containers?',
    options: ['docker rm $(docker ps -a -q)', 'docker rmi', 'docker prune images', 'docker stop'],
    answer: 'docker rm $(docker ps -a -q)',
    explanation: 'Use `docker ps -a -q` to get all container IDs and pass them to `docker rm` to remove stopped containers.',
    hint: 'Combine ps with rm',
    source: 'https://docs.docker.com/engine/reference/commandline/rm/'
  },
  {
    id: 134,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is the purpose of `docker exec -it`?',
    options: ['Execute a command in a running container interactively', 'Start a new container', 'Inspect an image', 'Build an image'],
    answer: 'Execute a command in a running container interactively',
    explanation: '`docker exec -it <container> /bin/sh` runs a shell inside a running container for debugging or interaction.',
    hint: 'Exec into running container',
    source: 'https://docs.docker.com/engine/reference/commandline/exec/'
  },
  {
    id: 135,
    category: 'docker',
    type: 'theory',
    difficulty: 'hard',
    question: 'Describe how to sign and verify images in a CI/CD pipeline using Docker Content Trust or Notary.',
    explanation: 'In CI, build images and sign them using Notary/Notary v2 or Docker Content Trust tools; push signed images to registry. Consumers enable content trust to verify signatures on pull, ensuring provenance. Implement key management and rotation and integrate signature verification into deployment pipelines.',
    hint: 'Build -> sign -> push -> verify on pull',
    source: 'https://docs.docker.com/engine/security/trust/'
  },
  {
    id: 136,
    category: 'docker',
    type: 'mcq',
    difficulty: 'hard',
    question: 'Which runtime interfaces with containerd to run containers?',
    options: ['runc', 'containerd', 'dockerd', 'cri-o'],
    answer: 'runc',
    explanation: '`runc` is the OCI runtime invoked by containerd to create and run containers according to OCI runtime spec.',
    hint: 'OCI runtime implementation',
    source: 'https://runc.io/'
  },
  {
    id: 137,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What does `docker stats` display?',
    options: ['Container logs', 'Realtime resource usage metrics (CPU, memory, network I/O)', 'Image sizes', 'Network topology'],
    answer: 'Realtime resource usage metrics (CPU, memory, network I/O)',
    explanation: '`docker stats` streams container resource usage metrics similar to top.',
    hint: 'Stats = resource usage',
    source: 'https://docs.docker.com/engine/reference/commandline/stats/'
  },
  {
    id: 138,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'Which logging driver ships logs to systemd/journald?',
    options: ['json-file', 'journald', 'syslog', 'fluentd'],
    answer: 'journald',
    explanation: 'The `journald` logging driver writes container logs to systemd journals.',
    hint: 'journald = systemd journal',
    source: 'https://docs.docker.com/config/containers/logging/configure/'
  },
  {
    id: 139,
    category: 'docker',
    type: 'mcq',
    difficulty: 'hard',
    question: 'What is the effect of `--security-opt seccomp=unconfined` when running a container?',
    options: ['Enables seccomp', 'Disables seccomp sandboxing for the container', 'Applies default seccomp profile', 'Sets network security options'],
    answer: 'Disables seccomp sandboxing for the container',
    explanation: 'Setting seccomp to unconfined removes syscall filtering, increasing risk; default profiles should be used where possible.',
    hint: 'Unconfined = no confinement',
    source: 'https://docs.docker.com/engine/security/seccomp/'
  },
  {
    id: 140,
    category: 'docker',
    type: 'mcq',
    difficulty: 'easy',
    question: 'Which port mapping maps a random host port to container port 80?',
    options: ['-p 80', '-p :80', '-p 0:80', '-P'],
    answer: '-p :80',
    explanation: 'Using `-p :80` lets Docker pick an ephemeral host port and map it to container port 80. `-P` publishes all exposed ports to random host ports.',
    hint: 'Empty host port => ephemeral',
    source: 'https://docs.docker.com/engine/reference/commandline/run/'
  },
  {
    id: 141,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What does `docker-compose config` do?',
    options: ['Validates and prints the merged Compose file', 'Starts services', 'Builds images', 'Removes services'],
    answer: 'Validates and prints the merged Compose file',
    explanation: '`docker-compose config` validates the compose file and shows the interpolated/merged configuration.',
    hint: 'Useful to check final config',
    source: 'https://docs.docker.com/compose/reference/config/'
  },
  {
    id: 142,
    category: 'docker',
    type: 'mcq',
    difficulty: 'hard',
    question: 'Why is it recommended to avoid `ADD` when `COPY` suffices?',
    options: ['ADD is deprecated', 'ADD has side-effects like auto-extraction and URL fetch which are implicit and can be surprising', 'COPY is faster', 'ADD does not support directories'],
    answer: 'ADD has side-effects like auto-extraction and URL fetch which are implicit and can be surprising',
    explanation: '`ADD` performs extra behaviors that are sometimes unexpected; `COPY` is transparent and preferred for simple copying.',
    hint: 'Implicit behaviors can be surprising',
    source: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#add-or-copy'
  },
  {
    id: 143,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'Which command shows build cache statistics for BuildKit?',
    options: ['docker buildx du', 'docker build --stats', 'docker cache ls', 'docker build cache'],
    answer: 'docker buildx du',
    explanation: '`docker buildx du` shows disk usage of buildx caches and builders when using BuildKit.',
    hint: 'buildx has additional build tooling',
    source: 'https://docs.docker.com/build/working-with-buildx/'
  },
  {
    id: 144,
    category: 'docker',
    type: 'mcq',
    difficulty: 'hard',
    question: 'Explain `COPY --from=` usage.',
    options: ['Copies from local host', 'Copies files from another build stage or image into current stage', 'Copies files and sets permissions', 'Copies only directories'],
    answer: 'Copies files from another build stage or image into current stage',
    explanation: '`COPY --from=stage` pulls artifacts from a named build stage or image; key for multi-stage builds.',
    hint: 'Used in multi-stage builds',
    source: 'https://docs.docker.com/develop/develop-images/multistage-build/'
  },
  {
    id: 145,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'Which command inspects image manifests and configuration?',
    options: ['docker image inspect', 'docker manifest inspect', 'docker inspect image', 'docker info'],
    answer: 'docker manifest inspect',
    explanation: '`docker manifest inspect` shows OCI/Docker image manifest and platform-specific descriptors.',
    hint: 'Manifest relates to image descriptors',
    source: 'https://docs.docker.com/engine/reference/commandline/manifest/'
  },
  {
    id: 146,
    category: 'docker',
    type: 'mcq',
    difficulty: 'hard',
    question: 'What is a digest in container registries?',
    options: ['A tag name', 'A content-addressable SHA256 identifier of an image', 'The image size', 'The registry URL'],
    answer: 'A content-addressable SHA256 identifier of an image',
    explanation: 'Digests uniquely identify image content independent of tags using cryptographic hashes.',
    hint: 'Content-addressable identifier',
    source: 'https://docs.docker.com/registry/spec/manifest-v2-2/'
  },
  {
    id: 147,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'How to reduce secrets leakage during image build?',
    options: ['Embed secrets in ENV', 'Use BuildKit secrets or mount secrets at runtime', 'Use ADD with URL', 'Store secrets in source repository'],
    answer: 'Use BuildKit secrets or mount secrets at runtime',
    explanation: 'Avoid embedding secrets in image layers; use build-time secret mounts and runtime secret managers.',
    hint: 'Do not bake secrets into layers',
    source: 'https://docs.docker.com/develop/develop-images/build_enhancements/'
  },
  {
    id: 148,
    category: 'docker',
    type: 'mcq',
    difficulty: 'easy',
    question: 'Which command creates a new container from an existing image?',
    options: ['docker create', 'docker build', 'docker image new', 'docker init'],
    answer: 'docker create',
    explanation: '`docker create` creates a container but does not start it; `docker run` creates and starts.',
    hint: 'Create vs Run',
    source: 'https://docs.docker.com/engine/reference/commandline/create/'
  },
  {
    id: 149,
    category: 'docker',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What does `docker pull` do?',
    options: ['Builds an image locally', 'Downloads an image from a registry', 'Runs a container', 'Pushes an image to registry'],
    answer: 'Downloads an image from a registry',
    explanation: '`docker pull` fetches an image from a remote registry and stores it locally.',
    hint: 'Pull = download',
    source: 'https://docs.docker.com/engine/reference/commandline/pull/'
  },
  {
    id: 150,
    category: 'docker',
    type: 'theory',
    difficulty: 'hard',
    question: 'Outline steps to harden a Docker host for production.',
    explanation: 'Steps include running Docker in rootless mode where possible, restricting access to the Docker socket, using least-privilege container users, applying seccomp/AppArmor/SELinux profiles, dropping unnecessary capabilities, scanning images for vulnerabilities, using signed/trusted images, and keeping host and Docker up-to-date. Also isolate management interfaces and use network/firewall controls.',
    hint: 'Protect daemon, limit privileges, and use sandboxing profiles',
    source: 'https://docs.docker.com/engine/security/'
  },
  // ---- Cloud Computing Fundamentals (IDs 201-255) ----
  {
    id: 201,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'easy',
    question: 'Which cloud service model requires the customer to manage OS, middleware, and runtime?',
    options: ['IaaS', 'PaaS', 'SaaS', 'FaaS'],
    answer: 'IaaS',
    explanation: 'Infrastructure as a Service (IaaS) provides virtualized computing resources over the internet. The vendor manages physical hardware while customers manage OS and above.',
    hint: 'I = Infrastructure, you manage everything above it',
    source: 'https://aws.amazon.com/types-of-cloud-computing/'
  },
  {
    id: 202,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'easy',
    question: 'Which cloud model abstracts infrastructure and provides a runtime environment?',
    options: ['IaaS', 'PaaS', 'SaaS', 'IaaS+'],
    answer: 'PaaS',
    explanation: 'Platform as a Service (PaaS) provides development platforms and tools; developers focus on code, vendor manages infrastructure, OS, middleware, runtime.',
    hint: 'P = Platform for development',
    source: 'https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-paas/'
  },
  {
    id: 203,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'easy',
    question: 'Which cloud service model provides ready-to-use applications accessed via browser?',
    options: ['IaaS', 'PaaS', 'SaaS', 'DBaaS'],
    answer: 'SaaS',
    explanation: 'Software as a Service (SaaS) delivers fully managed applications; users access them via web browser. Examples: Salesforce, Office 365, Google Workspace.',
    hint: 'S = Software, ready to use',
    source: 'https://www.microsoft.com/en-us/microsoft-365/business/what-is-saas'
  },
  {
    id: 204,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'easy',
    question: 'What does "public cloud" mean?',
    options: ['Cloud open only to authorized employees', 'Cloud services available to general public over internet', 'Cloud shared with specific organizations', 'Private data center'],
    answer: 'Cloud services available to general public over internet',
    explanation: 'Public cloud is infrastructure owned/operated by cloud providers and available to anyone. Examples: AWS, Azure, GCP.',
    hint: 'Public = open to everyone',
    source: 'https://aws.amazon.com/types-of-cloud-computing/'
  },
  {
    id: 205,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'easy',
    question: 'What is a private cloud?',
    options: ['Free tier of public cloud', 'Infrastructure provisioned for exclusive use by single organization', 'Cloud on personal computer', 'Backup storage'],
    answer: 'Infrastructure provisioned for exclusive use by single organization',
    explanation: 'Private cloud is dedicated infrastructure for a single organization, hosted on-premises or by a provider. Provides more control and security.',
    hint: 'Private = exclusive to one organization',
    source: 'https://www.ibm.com/cloud/learn/private-cloud'
  },
  {
    id: 206,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is a hybrid cloud?',
    options: ['Two separate clouds', 'Combination of public and private cloud environments', 'Cloud with multiple data centers', 'Multi-vendor solution'],
    answer: 'Combination of public and private cloud environments',
    explanation: 'Hybrid cloud integrates public and private cloud infrastructure, allowing workload portability and flexible resource usage.',
    hint: 'Hybrid = public + private mix',
    source: 'https://www.ibm.com/cloud/learn/hybrid-cloud'
  },
  {
    id: 207,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is a community cloud?',
    options: ['Free community support tier', 'Infrastructure shared by multiple organizations with common goals', 'Social media platform', 'Test environment'],
    answer: 'Infrastructure shared by multiple organizations with common goals',
    explanation: 'Community cloud serves multiple organizations with shared interests (e.g., healthcare providers, government agencies) sharing infrastructure and costs.',
    hint: 'Community = shared by similar organizations',
    source: 'https://en.wikipedia.org/wiki/Cloud_computing#Community'
  },
  {
    id: 208,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What does "scalability" mean in cloud computing?',
    options: ['Speed of data transfer', 'Ability to increase/decrease resources based on demand', 'Number of data centers', 'Security features'],
    answer: 'Ability to increase/decrease resources based on demand',
    explanation: 'Scalability is the cloud\'s ability to automatically add or remove resources (compute, storage) to match workload requirements.',
    hint: 'Scale = grow or shrink resources',
    source: 'https://aws.amazon.com/what-is/scalability/'
  },
  {
    id: 209,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "elasticity" in cloud computing?',
    options: ['Flexible pricing', 'System ability to dynamically adjust capacity automatically and quickly', 'Data compression', 'Multi-region deployment'],
    answer: 'System ability to dynamically adjust capacity automatically and quickly',
    explanation: 'Elasticity is automatic, rapid scaling up or down. Related to scalability but emphasizes the automation and speed of adjustment.',
    hint: 'Elasticity = automatic and quick adjustment',
    source: 'https://cloud.google.com/learn/what-is-cloud-elasticity'
  },
  {
    id: 210,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'Which cloud provider is owned by Amazon?',
    options: ['Microsoft Azure', 'Amazon Web Services (AWS)', 'Google Cloud Platform', 'Oracle Cloud'],
    answer: 'Amazon Web Services (AWS)',
    explanation: 'AWS is Amazon\'s cloud platform and the market leader in cloud services.',
    hint: 'Amazon = AWS',
    source: 'https://aws.amazon.com/'
  },
  {
    id: 211,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'Which cloud region strategy minimizes latency for global users?',
    options: ['Single region', 'Multi-region deployment', 'Public cloud only', 'On-premises only'],
    answer: 'Multi-region deployment',
    explanation: 'Deploying applications across multiple geographic regions reduces latency by serving users from the nearest region.',
    hint: 'Multiple regions = closer to users',
    source: 'https://aws.amazon.com/about-aws/global-infrastructure/'
  },
  {
    id: 212,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'easy',
    question: 'What is a cloud "availability zone"?',
    options: ['Marketing territory', 'Isolated data center within a region', 'Time zone', 'Geographic region'],
    answer: 'Isolated data center within a region',
    explanation: 'An availability zone is one or more isolated data centers in a region with independent power, cooling, and networking.',
    hint: 'AZ = isolated data center',
    source: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html'
  },
  {
    id: 213,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What does "cloud security" primarily address?',
    options: ['Only data encryption', 'Protecting data, infrastructure, and applications from threats and breaches', 'Only network firewalls', 'Physical security only'],
    answer: 'Protecting data, infrastructure, and applications from threats and breaches',
    explanation: 'Cloud security encompasses data protection, access controls, encryption, compliance, and infrastructure security.',
    hint: 'Security = comprehensive protection',
    source: 'https://www.ibm.com/cloud/learn/cloud-security'
  },
  {
    id: 214,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is the "shared responsibility model" in cloud computing?',
    options: ['Cloud vendor owns all responsibility', 'Customer and cloud vendor split security responsibilities based on service model', 'Customer owns all responsibility', 'Third party manages security'],
    answer: 'Customer and cloud vendor split security responsibilities based on service model',
    explanation: 'In shared responsibility, cloud vendor manages infrastructure security; customer manages data, access, and application security. Varies by service model.',
    hint: 'Vendor manages bottom, customer manages top',
    source: 'https://aws.amazon.com/compliance/shared-responsibility-model/'
  },
  {
    id: 215,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'hard',
    question: 'In IaaS, who is primarily responsible for OS patching?',
    options: ['Cloud provider', 'Customer', 'Third-party vendor', 'No one needs to patch'],
    answer: 'Customer',
    explanation: 'In IaaS, customer manages OS and above; cloud provider manages only physical infrastructure and hypervisor.',
    hint: 'IaaS = customer controls OS',
    source: 'https://aws.amazon.com/compliance/shared-responsibility-model/'
  },
  {
    id: 216,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'hard',
    question: 'In PaaS, who manages the database?',
    options: ['Customer only', 'Cloud provider', 'Both equally', 'External vendor'],
    answer: 'Cloud provider',
    explanation: 'In PaaS, provider manages infrastructure, OS, middleware, runtime, and typically databases. Customer manages applications.',
    hint: 'PaaS = less customer responsibility',
    source: 'https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-paas/'
  },
  {
    id: 217,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'hard',
    question: 'In SaaS, who is responsible for data security?',
    options: ['Only the provider', 'Shared responsibility between provider and customer', 'Only the customer', 'Third-party auditor'],
    answer: 'Shared responsibility between provider and customer',
    explanation: 'Even in SaaS, customer responsible for access controls and data governance; provider handles infrastructure and application security.',
    hint: 'SaaS still requires customer vigilance',
    source: 'https://www.microsoft.com/en-us/microsoft-365/business/what-is-saas'
  },
  {
    id: 218,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "data residency" in cloud computing?',
    options: ['Data backup frequency', 'Requirement for data to remain in specific geographic location', 'Data replication', 'Data deletion'],
    answer: 'Requirement for data to remain in specific geographic location',
    explanation: 'Data residency mandates that data stays within certain jurisdictions for compliance (GDPR, CCPA, etc.).',
    hint: 'Residency = geographic location requirement',
    source: 'https://www.ibm.com/cloud/learn/data-residency'
  },
  {
    id: 219,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is multi-tenancy in cloud?',
    options: ['Multiple cloud providers', 'Multiple customers sharing same infrastructure and resources', 'Multiple servers', 'Multiple backups'],
    answer: 'Multiple customers sharing same infrastructure and resources',
    explanation: 'Multi-tenancy allows multiple customers to share cloud infrastructure while maintaining data isolation through logical partitioning.',
    hint: 'Multi-tenant = many customers, one infrastructure',
    source: 'https://en.wikipedia.org/wiki/Multi-tenancy'
  },
  {
    id: 220,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'hard',
    question: 'How is data isolation ensured in multi-tenant cloud environments?',
    options: ['Physical separation only', 'Logical isolation using encryption, access controls, and database partitioning', 'No isolation', 'Separate servers'],
    answer: 'Logical isolation using encryption, access controls, and database partitioning',
    explanation: 'Multi-tenant systems use encryption, role-based access control, database views, and other logical mechanisms to isolate customer data.',
    hint: 'Logical isolation = software controls',
    source: 'https://www.ibm.com/cloud/learn/data-isolation'
  },
  {
    id: 221,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "cloud compliance"?',
    options: ['Following social media guidelines', 'Adherence to industry standards, regulations, and security controls', 'Vendor pricing models', 'Application performance'],
    answer: 'Adherence to industry standards, regulations, and security controls',
    explanation: 'Cloud compliance ensures systems meet legal, regulatory, and industry requirements (ISO, SOC 2, HIPAA, PCI-DSS, etc.).',
    hint: 'Compliance = meeting regulations',
    source: 'https://aws.amazon.com/compliance/'
  },
  {
    id: 222,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'easy',
    question: 'What is "auto-scaling" in cloud computing?',
    options: ['Manual resource adjustment', 'Automatic adjustment of resources based on demand metrics', 'Scaling database', 'Data compression'],
    answer: 'Automatic adjustment of resources based on demand metrics',
    explanation: 'Auto-scaling automatically adds/removes instances or resources based on metrics like CPU usage, memory, or network traffic.',
    hint: 'Auto = automatic',
    source: 'https://aws.amazon.com/autoscaling/'
  },
  {
    id: 223,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is a "load balancer" in cloud architecture?',
    options: ['Database backup', 'Distributes incoming traffic across multiple servers/instances', 'Storage device', 'Encryption tool'],
    answer: 'Distributes incoming traffic across multiple servers/instances',
    explanation: 'Load balancers distribute network traffic across multiple instances to ensure high availability, fault tolerance, and optimal performance.',
    hint: 'Load balancer = traffic distributor',
    source: 'https://aws.amazon.com/elasticloadbalancing/'
  },
  {
    id: 224,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "disaster recovery" in cloud?',
    options: ['Regular backups only', 'Plans and processes to restore systems and data after major failures', 'Cloud backup services', 'Data compression'],
    answer: 'Plans and processes to restore systems and data after major failures',
    explanation: 'Disaster recovery involves backup strategies, failover mechanisms, and recovery plans to minimize downtime and data loss.',
    hint: 'DR = restore after disaster',
    source: 'https://aws.amazon.com/disaster-recovery/'
  },
  {
    id: 225,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'hard',
    question: 'What is "RTO" (Recovery Time Objective)?',
    options: ['Time to recover data', 'Maximum acceptable time to restore system after failure', 'Backup frequency', 'Data retention time'],
    answer: 'Maximum acceptable time to restore system after failure',
    explanation: 'RTO defines the maximum downtime acceptable; shorter RTO requires faster recovery mechanisms.',
    hint: 'RTO = how long can it be down',
    source: 'https://en.wikipedia.org/wiki/Disaster_recovery'
  },
  {
    id: 226,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'hard',
    question: 'What is "RPO" (Recovery Point Objective)?',
    options: ['Recovery process time', 'Maximum acceptable data loss measured in time', 'Backup location', 'Recovery tool'],
    answer: 'Maximum acceptable data loss measured in time',
    explanation: 'RPO defines how much data loss is acceptable; shorter RPO requires more frequent backups.',
    hint: 'RPO = how much data loss is OK',
    source: 'https://en.wikipedia.org/wiki/Disaster_recovery'
  },
  {
    id: 227,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "cloud migration"?',
    options: ['Moving data only', 'Process of moving applications and data from on-premises to cloud', 'Changing cloud providers', 'Backup process'],
    answer: 'Process of moving applications and data from on-premises to cloud',
    explanation: 'Cloud migration involves assessing, planning, moving workloads, and validating systems on cloud infrastructure.',
    hint: 'Migration = move to cloud',
    source: 'https://aws.amazon.com/migration/'
  },
  {
    id: 228,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'hard',
    question: 'What is the "6Rs" migration strategy framework?',
    options: ['Backup, restore, replicate, recover, replace, refactor', 'Rehost, replatform, refactor, repurchase, retire, repatriate', 'Read, rewrite, replace, reconfigure, remove, run', 'Request, review, respond, report, record, recover'],
    answer: 'Rehost, replatform, refactor, repurchase, retire, repatriate',
    explanation: 'AWS 6Rs: Rehost (lift-shift), Replatform (lift-tinker), Refactor (re-architect), Repurchase (switch to SaaS), Retire (turn off), Repatriate (move back).',
    hint: '6Rs = migration strategies',
    source: 'https://aws.amazon.com/blogs/enterprise-strategy/6-strategies-for-migrating-applications-to-the-cloud/'
  },
  {
    id: 229,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "serverless computing"?',
    options: ['No servers available', 'Computing model where vendor manages infrastructure; developers write functions', 'Virtual servers only', 'Peer-to-peer computing'],
    answer: 'Computing model where vendor manages infrastructure; developers write functions',
    explanation: 'Serverless abstracts infrastructure; developers write event-driven functions. Examples: AWS Lambda, Google Cloud Functions.',
    hint: 'Serverless = no infrastructure management',
    source: 'https://aws.amazon.com/serverless/'
  },
  {
    id: 230,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "containers" in cloud computing?',
    options: ['Storage units', 'Lightweight, portable execution environments with isolated dependencies', 'Deployment zones', 'Virtual machines'],
    answer: 'Lightweight, portable execution environments with isolated dependencies',
    explanation: 'Containers package applications with dependencies; more lightweight than VMs. Docker is popular container platform.',
    hint: 'Containers = lightweight VMs',
    source: 'https://www.docker.com/resources/what-container'
  },
  {
    id: 231,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "container orchestration"?',
    options: ['Organizing containers manually', 'Automated deployment, management, and scaling of containers', 'Container storage', 'Container networking'],
    answer: 'Automated deployment, management, and scaling of containers',
    explanation: 'Container orchestrators like Kubernetes automate deployment, scaling, and lifecycle management of containerized workloads.',
    hint: 'Orchestration = automated management',
    source: 'https://kubernetes.io/'
  },
  {
    id: 232,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'easy',
    question: 'What is the "cloud payment model"?',
    options: ['Upfront purchase only', 'Monthly fixed costs only', 'Pay-as-you-go for consumed resources', 'Annual contracts only'],
    answer: 'Pay-as-you-go for consumed resources',
    explanation: 'Cloud pricing is typically usage-based (pay-as-you-go), allowing cost efficiency without large upfront investments.',
    hint: 'Cloud = pay for what you use',
    source: 'https://aws.amazon.com/pricing/'
  },
  {
    id: 233,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "cloud cost optimization"?',
    options: ['Using free tier only', 'Strategies to reduce cloud spending through efficient resource usage and planning', 'Avoiding cloud', 'Unused instances'],
    answer: 'Strategies to reduce cloud spending through efficient resource usage and planning',
    explanation: 'Cost optimization includes right-sizing instances, using reserved instances, spot instances, and removing unused resources.',
    hint: 'Optimization = reduce spending',
    source: 'https://aws.amazon.com/aws-cost-management/'
  },
  {
    id: 234,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "vendor lock-in" risk?',
    options: ['Server downtime', 'Dependency on vendor-specific services making migration difficult', 'Network outage', 'Data loss'],
    answer: 'Dependency on vendor-specific services making migration difficult',
    explanation: 'Vendor lock-in occurs when migrating away from a cloud vendor is expensive or difficult due to proprietary services/APIs.',
    hint: 'Lock-in = hard to switch vendors',
    source: 'https://en.wikipedia.org/wiki/Vendor_lock-in'
  },
  {
    id: 235,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'hard',
    question: 'How to mitigate cloud vendor lock-in?',
    options: ['Stay with one vendor', 'Use open standards, APIs, containers, and multi-cloud strategies', 'Avoid cloud', 'Manual migrations'],
    answer: 'Use open standards, APIs, containers, and multi-cloud strategies',
    explanation: 'Mitigate lock-in using containerization, avoiding proprietary services, using open APIs, and adopting multi-cloud architecture.',
    hint: 'Standards + portability = flexibility',
    source: 'https://www.ibm.com/cloud/learn/multi-cloud'
  },
  {
    id: 236,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "edge computing"?',
    options: ['Central processing', 'Computing at the edge of networks closer to data sources for lower latency', 'Network boundary', 'Cloud perimeter'],
    answer: 'Computing at the edge of networks closer to data sources for lower latency',
    explanation: 'Edge computing processes data locally near the source, reducing latency and bandwidth usage. Often used with cloud for hybrid approaches.',
    hint: 'Edge = close to data source',
    source: 'https://aws.amazon.com/edge/'
  },
  {
    id: 237,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "API gateway" in cloud?',
    options: ['Web browser', 'Service that manages, routes, and secures API requests to backend services', 'Database gateway', 'Network firewall'],
    answer: 'Service that manages, routes, and secures API requests to backend services',
    explanation: 'API gateways handle authentication, rate limiting, request routing, and transformation between clients and microservices.',
    hint: 'API gateway = front door for APIs',
    source: 'https://aws.amazon.com/api-gateway/'
  },
  {
    id: 238,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "microservices" architecture?',
    options: ['Small databases', 'Architecture breaking applications into small, independent, scalable services', 'Minimal features', 'Small servers'],
    answer: 'Architecture breaking applications into small, independent, scalable services',
    explanation: 'Microservices architecture decomposes applications into loosely-coupled, independently deployable services communicating via APIs.',
    hint: 'Microservices = small independent services',
    source: 'https://microservices.io/'
  },
  {
    id: 239,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'hard',
    question: 'What is "service mesh"?',
    options: ['Database connection', 'Infrastructure layer managing service-to-service communication, security, and observability', 'Network topology', 'API endpoint'],
    answer: 'Infrastructure layer managing service-to-service communication, security, and observability',
    explanation: 'Service mesh (e.g., Istio) provides observability, traffic management, security policies for microservices communication.',
    hint: 'Service mesh = communication layer',
    source: 'https://istio.io/'
  },
  {
    id: 240,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What does "immutable infrastructure" mean?',
    options: ['Never changing servers', 'Infrastructure replaced rather than modified to ensure consistency', 'Static data', 'Read-only systems'],
    answer: 'Infrastructure replaced rather than modified to ensure consistency',
    explanation: 'Immutable infrastructure means replacing entire instances/environments rather than updating them, ensuring reproducibility.',
    hint: 'Immutable = replace, not modify',
    source: 'https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure'
  },
  {
    id: 241,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "infrastructure as code" (IaC)?',
    options: ['Code running on servers', 'Managing infrastructure using code/configuration files instead of manual setup', 'Application code', 'Network configuration'],
    answer: 'Managing infrastructure using code/configuration files instead of manual setup',
    explanation: 'IaC tools like Terraform, CloudFormation, Ansible enable infrastructure provisioning through declarative code.',
    hint: 'IaC = infrastructure via code',
    source: 'https://en.wikipedia.org/wiki/Infrastructure_as_code'
  },
  {
    id: 242,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'easy',
    question: 'What is "DevOps"?',
    options: ['Development role only', 'Cultural and technical practice merging development and operations', 'Operations role only', 'Testing team'],
    answer: 'Cultural and technical practice merging development and operations',
    explanation: 'DevOps promotes collaboration between dev and ops teams using automation, CI/CD, monitoring to improve velocity and reliability.',
    hint: 'DevOps = dev + ops collaboration',
    source: 'https://aws.amazon.com/devops/what-is-devops/'
  },
  {
    id: 243,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "observability" in cloud systems?',
    options: ['System monitoring only', 'Ability to understand system state through logs, metrics, traces, and alerts', 'Performance testing', 'Documentation'],
    answer: 'Ability to understand system state through logs, metrics, traces, and alerts',
    explanation: 'Observability provides deep insights into system behavior via three pillars: logs, metrics, traces.',
    hint: 'Observability = see what is happening',
    source: 'https://en.wikipedia.org/wiki/Observability'
  },
  {
    id: 244,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "CI/CD pipeline"?',
    options: ['Code management only', 'Continuous integration and continuous deployment automating testing and releasing code', 'Data pipeline', 'Network pipeline'],
    answer: 'Continuous integration and continuous deployment automating testing and releasing code',
    explanation: 'CI/CD automates code building, testing, and deployment enabling frequent, reliable releases.',
    hint: 'CI/CD = automated test and deploy',
    source: 'https://aws.amazon.com/devops/continuous-integration/'
  },
  {
    id: 245,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'hard',
    question: 'What is "zero-trust security"?',
    options: ['No security measures', 'Security model assuming no implicit trust; verify every access request', 'Trust everyone', 'Perimeter security only'],
    answer: 'Security model assuming no implicit trust; verify every access request',
    explanation: 'Zero-trust requires authentication and authorization for every access, regardless of location or network.',
    hint: 'Zero-trust = verify everything',
    source: 'https://www.nist.gov/publications/zero-trust-architecture'
  },
  {
    id: 246,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "identity and access management" (IAM)?',
    options: ['User password storage', 'Controlling who can access what resources and what they can do', 'Network security', 'Firewall rules'],
    answer: 'Controlling who can access what resources and what they can do',
    explanation: 'IAM manages user identities, authentication, authorization, and access policies across cloud resources.',
    hint: 'IAM = access control',
    source: 'https://aws.amazon.com/iam/'
  },
  {
    id: 247,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "encryption in transit"?',
    options: ['Storing data safely', 'Encrypting data while moving between systems', 'Encryption keys', 'Network encryption'],
    answer: 'Encrypting data while moving between systems',
    explanation: 'Encryption in transit protects data as it travels (e.g., HTTPS, TLS) preventing interception.',
    hint: 'In transit = while moving',
    source: 'https://www.cloudflare.com/learning/ssl/why-is-ssl-tls-important/'
  },
  {
    id: 248,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "encryption at rest"?',
    options: ['Network encryption', 'Encrypting stored data in databases, storage systems', 'TLS encryption', 'Network traffic'],
    answer: 'Encrypting stored data in databases, storage systems',
    explanation: 'Encryption at rest protects data stored on disks, in databases, preventing unauthorized access if storage is compromised.',
    hint: 'At rest = stored data',
    source: 'https://aws.amazon.com/encryption/'
  },
  {
    id: 249,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'hard',
    question: 'What is "DDoS protection" in cloud?',
    options: ['Firewall only', 'Mechanisms to mitigate distributed denial-of-service attacks', 'Load balancing only', 'Encryption'],
    answer: 'Mechanisms to mitigate distributed denial-of-service attacks',
    explanation: 'Cloud DDoS protection uses traffic scrubbing, rate limiting, geo-filtering to defend against attack floods.',
    hint: 'DDoS = attack mitigation',
    source: 'https://aws.amazon.com/shield/'
  },
  {
    id: 250,
    category: 'cloud',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is "database scaling" in cloud?',
    options: ['Database backup', 'Increasing database capacity (vertical) or using sharding/replication (horizontal)', 'Database partitioning', 'Replication only'],
    answer: 'Increasing database capacity (vertical) or using sharding/replication (horizontal)',
    explanation: 'Vertical scaling adds resources to single node; horizontal scaling distributes data across nodes.',
    hint: 'Scaling = grow database',
    source: 'https://aws.amazon.com/rds/details/multi-az/'
  },
  {
    id: 251,
    category: 'cloud',
    type: 'theory',
    difficulty: 'hard',
    question: 'Describe the differences between vertical and horizontal scaling.',
    explanation: 'Vertical scaling (scale-up) adds resources (CPU, RAM) to existing instance, has hardware limits. Horizontal scaling (scale-out) adds more instances/nodes, better for distributed systems and avoids single points of failure.',
    hint: 'Vertical = bigger machine, Horizontal = more machines',
    source: 'https://aws.amazon.com/scaling/'
  },
  {
    id: 252,
    category: 'cloud',
    type: 'theory',
    difficulty: 'hard',
    question: 'Explain multi-cloud strategy and its benefits.',
    explanation: 'Multi-cloud uses services from multiple providers reducing vendor lock-in, improving availability, leveraging best-of-breed services, ensuring business continuity if one provider has outages. Challenges: complexity, data synchronization, management overhead.',
    hint: 'Multi-cloud = multiple providers',
    source: 'https://www.ibm.com/cloud/learn/multi-cloud'
  },
  {
    id: 253,
    category: 'cloud',
    type: 'theory',
    difficulty: 'hard',
    question: 'Describe how to design a highly available and fault-tolerant cloud architecture.',
    explanation: 'Use multi-region/AZ deployment, load balancing, auto-scaling, database replication, caching layers, health checks, graceful degradation, monitoring/alerting. Implement circuit breakers, retry logic, and async communication patterns.',
    hint: 'Redundancy + distribution = high availability',
    source: 'https://aws.amazon.com/well-architected/'
  },
  {
    id: 254,
    category: 'cloud',
    type: 'theory',
    difficulty: 'hard',
    question: 'What are cloud security best practices?',
    explanation: 'Practices include: apply principle of least privilege (POLP), enable MFA, encrypt data in transit/at rest, network segmentation, regular audits/penetration testing, patch management, monitoring/logging, comply with regulations, secrets management, secure supply chains.',
    hint: 'Security = layered defense',
    source: 'https://aws.amazon.com/security/best-practices/'
  },
  {
    id: 255,
    category: 'cloud',
    type: 'theory',
    difficulty: 'hard',
    question: 'Explain cloud cost management strategies.',
    explanation: 'Strategies include: right-sizing resources, using reserved/spot instances, eliminating unused resources, monitoring spend, auto-scaling during off-peak, leveraging cost calculators, implementing tagging, using savings plans, negotiating volume discounts.',
    hint: 'Cost management = continuous monitoring and optimization',
    source: 'https://aws.amazon.com/aws-cost-management/'
  }
];

// Sample DevOps Tools Data
const devopsTools = [
  {
    id: 1,
    title: "Docker",
    category: "containerization",
    description: "Containerization platform for packaging and running applications",
    icon: "fab fa-docker",
    features: ["Container management", "Image building", "Registry"],
    website: "docker.com",
    rating: 4.9,
    views: 5234
  },
  {
    id: 2,
    title: "Kubernetes",
    category: "orchestration",
    description: "Open-source container orchestration platform",
    icon: "fas fa-cube",
    features: ["Auto-scaling", "Load balancing", "Self-healing"],
    website: "kubernetes.io",
    rating: 4.8,
    views: 4892
  },
  {
    id: 3,
    title: "Jenkins",
    category: "cicd",
    description: "Open-source automation server for CI/CD pipelines",
    icon: "fas fa-cogs",
    features: ["Pipeline scripting", "Distributed builds", "Plugins"],
    website: "jenkins.io",
    rating: 4.6,
    views: 3567
  },
  {
    id: 4,
    title: "Prometheus",
    category: "monitoring",
    description: "Monitoring and time-series database for metrics",
    icon: "fas fa-chart-line",
    features: ["Metrics collection", "Alerting", "Visualization"],
    website: "prometheus.io",
    rating: 4.7,
    views: 2845
  },
  {
    id: 5,
    title: "Terraform",
    category: "infrastructure",
    description: "Infrastructure as Code tool for provisioning resources",
    icon: "fas fa-code",
    features: ["Multi-cloud", "State management", "Modules"],
    website: "terraform.io",
    rating: 4.8,
    views: 3456
  },
  {
    id: 6,
    title: "GitLab CI/CD",
    category: "cicd",
    description: "Integrated CI/CD platform with version control",
    icon: "fab fa-gitlab",
    features: ["Built-in CI/CD", "Container registry", "Auto DevOps"],
    website: "gitlab.com",
    rating: 4.7,
    views: 2123
  }
];

// Sample Cloud Services Data
const cloudServices = [
  {
    id: 1,
    title: "AWS EC2",
    provider: "aws",
    description: "Elastic cloud computing with scalable virtual machines",
    icon: "fab fa-aws",
    pricing: "Pay-as-you-go",
    rating: 4.8,
    views: 5678,
    tags: ["Compute", "Virtual Machines", "Auto-scaling"]
  },
  {
    id: 2,
    title: "Azure Kubernetes Service",
    provider: "azure",
    description: "Managed Kubernetes service for container orchestration",
    icon: "fab fa-microsoft",
    pricing: "Pay-as-you-go",
    rating: 4.7,
    views: 3245,
    tags: ["Kubernetes", "Containers", "Orchestration"]
  },
  {
    id: 3,
    title: "Google Cloud Storage",
    provider: "gcp",
    description: "Unified object storage with high availability",
    icon: "fas fa-cloud",
    pricing: "$0.020/GB",
    rating: 4.6,
    views: 2876,
    tags: ["Storage", "Data", "Backup"]
  },
  {
    id: 4,
    title: "AWS RDS",
    provider: "aws",
    description: "Managed relational database service with auto backups",
    icon: "fas fa-database",
    pricing: "Pay-as-you-go",
    rating: 4.9,
    views: 4123,
    tags: ["Database", "SQL", "Managed"]
  },
  {
    id: 5,
    title: "Azure DevOps",
    provider: "azure",
    description: "Complete DevOps services for CI/CD and project management",
    icon: "fas fa-tasks",
    pricing: "Free to $6/user",
    rating: 4.5,
    views: 2345,
    tags: ["DevOps", "CI/CD", "Collaboration"]
  },
  {
    id: 6,
    title: "GCP Compute Engine",
    provider: "gcp",
    description: "Scalable virtual machines running on Google infrastructure",
    icon: "fas fa-server",
    pricing: "Pay-as-you-go",
    rating: 4.7,
    views: 2567,
    tags: ["Compute", "VM", "Infrastructure"]
  }
];

// ==================== Card Rendering Functions ====================

function renderCard(data, cardType = 'content') {
  let cardHTML = `<div class="content-card">`;

  if (cardType === 'interview') {
    // Normalize fields to support legacy and new question schema
    const qTitle = data.title || data.question || 'Untitled Question';
    const qDesc = data.description || data.explanation || '';
    const qTags = Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []);
    const qDifficulty = data.difficulty || 'unknown';
    const qRating = data.rating || 0;
    const qViews = data.views || 0;
    const hasHint = data.hint && data.hint.trim().length > 0;
    const hasAnswer = data.answer && data.answer.trim().length > 0;
    const hasExplanation = data.explanation && data.explanation.trim().length > 0;

    cardHTML += `
      <div class="card-header">
        <div class="card-icon"><i class="fas fa-comments"></i></div>
        <span class="difficulty-badge ${qDifficulty}">${qDifficulty.toUpperCase()}</span>
      </div>
      <h3 class="card-title">${qTitle}</h3>
      <p class="card-description">${qDesc}</p>
      ${data.type === 'mcq' && Array.isArray(data.options) ? `
        <div class="mcq-options">
          ${data.options.map((opt, i) => `
            <div class="mcq-option">
              <span class="option-letter">${String.fromCharCode(65 + i)}</span>
              <span>${opt}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
      <div class="card-meta">
        ${qTags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
      </div>
      <div class="card-rating">
        <span class="star">★ ${qRating}</span>
        <span>(${qViews} views)</span>
      </div>
      <div class="card-actions">
        ${hasHint ? `<button class="btn btn-secondary" data-answer-btn="${data.id}-hint" onclick="toggleAnswerCard(${data.id}, 'hint')">
          <i class="fas fa-lightbulb"></i> Hint
        </button>` : ''}
        ${hasAnswer ? `<button class="btn btn-secondary" data-answer-btn="${data.id}-answer" onclick="toggleAnswerCard(${data.id}, 'answer')">
          <i class="fas fa-check-circle"></i> Answer
        </button>` : ''}
        ${hasExplanation ? `<button class="btn btn-secondary" data-answer-btn="${data.id}-explanation" onclick="toggleAnswerCard(${data.id}, 'explanation')">
          <i class="fas fa-book"></i> Explanation
        </button>` : ''}
        <button class="btn btn-outline" onclick="bookmarkQuestion(${data.id})">
          <i class="fas fa-bookmark"></i> Save
        </button>
      </div>
    `;
    cardHTML = `<div class="card-wrapper" data-question-id="${data.id}">` + cardHTML + `</div>`;
  } else if (cardType === 'tool') {
    cardHTML += `
      <div class="card-header">
        <div class="card-icon"><i class="${data.icon}"></i></div>
      </div>
      <h3 class="card-title">${data.title}</h3>
      <p class="card-description">${data.description}</p>
      <ul class="tool-features">
        ${data.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
      </ul>
      <div class="card-rating">
        <span class="star">★ ${data.rating}</span>
        <span>(${data.views} views)</span>
      </div>
      <div class="card-actions">
        <button class="btn btn-primary" onclick="openTool('${data.website}')">
          <i class="fas fa-external-link-alt"></i> Visit
        </button>
        <button class="btn btn-outline" onclick="learnTool(${data.id})">
          <i class="fas fa-graduation-cap"></i> Learn
        </button>
      </div>
    `;
  } else if (cardType === 'cloud') {
    const providerBadge = {
      'aws': 'AWS',
      'azure': 'Azure',
      'gcp': 'GCP',
      'multicloud': 'Multi-Cloud'
    };
    cardHTML += `
      <div class="card-header">
        <div class="card-icon"><i class="${data.icon}"></i></div>
        <span class="card-badge">${providerBadge[data.provider]}</span>
      </div>
      <h3 class="card-title">${data.title}</h3>
      <p class="card-description">${data.description}</p>
      <div class="service-pricing">
        <div class="service-pricing-value">${data.pricing}</div>
        <div class="service-pricing-label">Pricing Model</div>
      </div>
      <div class="card-meta">
        ${data.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
      </div>
      <div class="card-rating">
        <span class="star">★ ${data.rating}</span>
        <span>(${data.views} views)</span>
      </div>
      <div class="card-actions">
        <button class="btn btn-primary" onclick="exploreService(${data.id})">
          <i class="fas fa-cloud"></i> Explore
        </button>
        <button class="btn btn-outline" onclick="compareService(${data.id})">
          <i class="fas fa-balance-scale"></i> Compare
        </button>
      </div>
    `;
  }

  cardHTML += `</div>`;
  return cardHTML;
}

// ==================== Content Rendering ====================

function renderInterviewQuestions(filter = 'all') {
  const container = document.getElementById('interviewContent');
  if (!container) return;
  // Filter by category/topic if requested
  let filtered = interviewQuestions || [];
  if (filter && filter !== 'all') {
    filtered = filtered.filter(q => (q.category === filter) || (q.topic === filter));
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1;">
        <div class="empty-state">
          <div class="empty-state-icon">📝</div>
          <div class="empty-state-text">No questions found in this category</div>
        </div>
      </div>
    `;
    return;
  }

  // Group by difficulty: easy, medium, hard/advanced
  const groups = { easy: [], medium: [], hard: [] };
  filtered.forEach(q => {
    const d = (q.difficulty || '').toString().toLowerCase();
    if (d.includes('easy')) groups.easy.push(q);
    else if (d.includes('medium')) groups.medium.push(q);
    else groups.hard.push(q);
  });

  let html = '';

  const renderGroup = (title, items) => {
    if (!items || items.length === 0) return '';
    return `
      <div class="difficulty-group">
        <h2 class="group-title">${title} <span class="group-count">(${items.length})</span></h2>
        <div class="group-grid">
          ${items.map(q => renderCard(q, 'interview')).join('')}
        </div>
      </div>
    `;
  };

  html += renderGroup('Easy', groups.easy);
  html += renderGroup('Medium', groups.medium);
  html += renderGroup('Hard / Advanced', groups.hard);

  container.innerHTML = html;
}

function renderDevopsTools(filter = 'all') {
  const container = document.getElementById('toolsContent');
  if (!container) return;

  let filtered = devopsTools;
  if (filter !== 'all') {
    filtered = devopsTools.filter(t => t.category === filter);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1;">
        <div class="empty-state">
          <div class="empty-state-icon">🛠️</div>
          <div class="empty-state-text">No tools found in this category</div>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(t => renderCard(t, 'tool')).join('');
}

function renderCloudServices(filter = 'all') {
  const container = document.getElementById('cloudContent');
  if (!container) return;

  let filtered = cloudServices;
  if (filter !== 'all') {
    filtered = cloudServices.filter(s => s.provider === filter);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1;">
        <div class="empty-state">
          <div class="empty-state-icon">☁️</div>
          <div class="empty-state-text">No services found from this provider</div>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(s => renderCard(s, 'cloud')).join('');
}

// ==================== Event Handlers ====================

function toggleAnswerCard(questionId, cardType = 'explanation') {
  const question = interviewQuestions.find(q => q.id === questionId);
  if (!question) return;

  // Use unique ID for each answer card
  const answerId = `answer-card-${questionId}-${cardType}`;
  const existingCard = document.getElementById(answerId);
  
  // If card already exists, toggle it
  if (existingCard) {
    const isVisible = existingCard.style.display !== 'none';
    existingCard.style.display = isVisible ? 'none' : 'block';
    // Update button state
    updateAnswerButtonState(questionId, cardType);
    return;
  }

  // Create new answer card
  let cardContent = '';
  let cardTitle = '';
  let cardIcon = '';

  if (cardType === 'explanation') {
    if (question.explanation) {
      cardTitle = '💡 Explanation';
      cardContent = question.explanation;
    } else {
      cardContent = 'No explanation available for this question.';
    }
  } else if (cardType === 'answer') {
    if (question.answer) {
      cardTitle = '✓ Correct Answer';
      if (question.type === 'mcq') {
        cardContent = `<strong>${question.answer}</strong>`;
      } else {
        cardContent = question.answer;
      }
    } else {
      cardContent = 'No answer available for this question.';
    }
  } else if (cardType === 'hint') {
    if (question.hint) {
      cardTitle = '💡 Hint';
      cardContent = question.hint;
    } else {
      cardContent = 'No hint available for this question.';
    }
  }

  // Create and insert card
  const cardHTML = `
    <div id="${answerId}" class="answer-card answer-card-${cardType}">
      <div class="answer-card-header">
        <span class="answer-card-title">${cardTitle}</span>
        <button class="answer-card-close" onclick="closeAnswerCard('${answerId}')">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="answer-card-content">${cardContent}</div>
    </div>
  `;

  // Find the question card and insert after it
  const questionCard = document.querySelector(`[data-question-id="${questionId}"]`);
  if (questionCard) {
    questionCard.insertAdjacentHTML('afterend', cardHTML);
    // Trigger animation
    const newCard = document.getElementById(answerId);
    setTimeout(() => newCard.classList.add('show'), 10);
  }

  updateAnswerButtonState(questionId, cardType);
}

function closeAnswerCard(cardId) {
  const card = document.getElementById(cardId);
  if (card) {
    card.classList.remove('show');
    setTimeout(() => card.remove(), 300);
  }
}

function updateAnswerButtonState(questionId, cardType) {
  const btn = document.querySelector(`[data-answer-btn="${questionId}-${cardType}"]`);
  if (btn) {
    const card = document.getElementById(`answer-card-${questionId}-${cardType}`);
    if (card && card.style.display !== 'none') {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  }
}

function bookmarkQuestion(questionId) {
  const q = interviewQuestions.find(q => q.id === questionId);
  if (!q) {
    showFeedback('❌ Question not found');
    return;
  }
  if (!appState.bookmarks.includes(questionId)) {
    appState.bookmarks.push(questionId);
    saveState();
    showFeedback('✅ Question bookmarked! View it in the Bookmarks section.');
  } else {
    showFeedback('📌 Already bookmarked!');
  }
}

function openTool(website) {
  window.open(`https://${website}`, '_blank');
}

function learnTool(toolId) {
  showFeedback('📚 Tool learning resources and tutorials coming soon!');
}

function exploreService(serviceId) {
  showFeedback('☁️ Detailed service exploration and documentation loading...');
}

function compareService(serviceId) {
  showFeedback('🔄 Service comparison tool coming soon!');
}

// ==================== Initialize Content Pages ====================

document.addEventListener('DOMContentLoaded', function() {
  // Render initial content
  renderInterviewQuestions();
  renderDevopsTools();
  renderCloudServices();

  // Add filter event listeners for interview questions
  document.querySelectorAll('#interview .filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('#interview .filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      renderInterviewQuestions(filter);
    });
  });

  // Add filter event listeners for tools
  document.querySelectorAll('#tools .filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('#tools .filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      renderDevopsTools(filter);
    });
  });

  // Add filter event listeners for cloud services
  document.querySelectorAll('#cloud .filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('#cloud .filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      renderCloudServices(filter);
    });
  });
});

