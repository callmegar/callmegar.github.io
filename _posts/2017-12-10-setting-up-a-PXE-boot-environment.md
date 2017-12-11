---
layout: post
title: Bare metal Kubernetes I
subtitle: Setting up a PXE boot environment
---

My goal was to setup a Kubernetes 1.8 environment using bare metal servers running on CoreOS Container Linux. Container Linux is a compact operating system, on bare metal the provisioning is most times automated using a PXE boot environment and tools like [Matchbox](https://github.com/coreos/matchbox), [Mayu](https://github.com/callmegar/mayu) or [RackHD](https://github.com/RackHD/RackHD). Matchbox (maintained by CoreOS) is by far the simplest and easier to use for installs based on Container Linux, it requires an existing PXE boot environment, you can use your existing DHCP infrastructure or if you want to keep it separate [Dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html) can be used to provide such environment.

Mayu is very close in functionality and features to Matchbox, it is a good tool but due to the duplicity I do not think it will be maintained for long. RackHD aims to provide extended bare metal functionality like inventory, configuration management and firmware updates and it provides a robust API, but it is not well documented or maintained at this point and it gets complex really soon, I played with it for a while and ended up with multiple Postman templates and clever artifacts to do the work, too complex for the task at hand. I also tried [Cobbler](http://cobbler.github.io/) which has worked really well for CentOS deployments in the past but it did not have a good way of integrating the ignition scripts. Another tool to keep an eye on is [RackN](https://www.rackn.com/), a commercial offering based on [Digital Rebar](http://rebar.digital/) that looks like an easier to use better maintained version of RackHD, they do not directly support Container Linux now, but I think they will soon.

## Servers and network interfaces

Before working on the PXE boot piece it is necessary to analyze the current environment and the desired final state of the servers, it is a common trait on a Kubernetes environment for each server to have multiple NIC's bonded to provide high availability and/or additional bandwidth, on my implementation I also wanted for this bonded interface to be a trunk to the network infrastructure, to gain the capability to create virtual interfaces on multiple VLAN's, to keep storage traffic separate for example. Keeping the Kubernetes control plane on a separate network it is also sometimes required by stringent information security departments.

Trunk interfaces are a touch point with network infrastructure, the switch ports have to be configured either as host or trunk, extra care needs to be taken on this configuration, I have seen implementations perform poorly due to network ports not having the proper parameters (host port parameters on a trunk link or vice versa). Also trunk interfaces, individually or bonded, do not work with PXE booting, as there is no host interface defined at boot time, I have seen some teams reconfiguring switch ports after PXE booting, this is just not good, reserving an individual interface for PXE booting is highly recommended. In the following picture I used the 172.0.1.0/24 network (identified as VLAN 172_0_1) as the reserved network for PXE booting, any subnet really works here.

**Desired PXE deployment**

![Desired PXE deployment]({{ "/img/pxe-1.png" | absolute_url }})

I had some issues with bare metal servers being pre-configured to get DHCP addresses on at least one host interface, this may lead to IP addresses being obscurely assigned (while the server is powering on, with or without any OS on it) to interfaces and never used, at some point causing duplicate or exhaustion IP address issues. While you are at it, make sure your BIOS energy savings parameters are configured for high performance, energy saving is good for the planet but it is terrible for highly utilized servers.

