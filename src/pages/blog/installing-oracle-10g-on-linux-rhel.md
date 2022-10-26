---
layout: "../../layouts/BlogPost.astro"
title: "Installing Oracle 10g on Linux RHEL"
description: ""
pubDate: "2007-08-24T12:04:44.000Z"
heroImage: ""
slug: "installing-oracle-10g-on-linux-rhel"
tags: ["Tech"]
---

I have been recently installing Oracle on a RHEL system, so thought I would post an how to, so it will be easier for me or you do it later.

The following procedure is a step-by-step guide (Cookbook) with tips and information for installing Oracle Database 10g on Red Hat Linux.
This guide shows how I installed 10g Database on the Red Hat system:

## Downloading Oracle10g Software and Burning Oracle10g CDs
Download Oracle 10g (32-bit and 64-bit) for Linux from OTN to install linux 10g oracle:
<a href="http://otn.oracle.com/software/products/database/oracle10g/index.html">http://otn.oracle.com/software/products/database/oracle10g/index.html</a>
NOTE: <em>To install a Oracle Database 10g (without RAC) you only need to download the database file <tt>ship.db.lnx32.cpio.gz</tt>, or <tt>10201_database_linux_x86_64.cpio</tt> etc.</em>
Compute a cyclic redundancy check (CRC) checksum for the downloaded files and compare the checksum numbers against the numbers posted on OTN's website. For example:

```bash
> cksum ship.db.lnx32.cpio.gz
```

Uncompress the downloaded file(s):
```bash
gunzip ship.db.lnx32.cpio.gz
```
Unpack <tt>ship.db.lnx32.cpio</tt>:
```bash
$ cpio -idmv &lt; ship.db.lnx32.cpio

Disk1/stage/Components/oracle.server/10.1.0.3.0/1
Disk1/stage/Components/oracle.server/10.1.0.3.0
Disk1/stage/Components/oracle.server
Disk1/stage/Components/oracle.tg/10.1.0.3.0/1/DataFiles
Disk1/stage/Components/oracle.tg/10.1.0.3.0/1
Disk1/stage/Components/oracle.tg/10.1.0.3.0
Disk1/stage/Components/oracle.tg
Disk1/stage/Components/oracle.assistants.dbca/10.1.0.3.0/1/DataFiles/doc.3.1.jar
Disk1/stage/Components/oracle.assistants.dbca/10.1.0.3.0/1/DataFiles/class.jar
...
```
I executed the following command to burn the <tt>Disk1</tt> directory on a CD:
```bash
mkisofs -r Disk1 | cdrecord -v dev=0,0,0 speed=20 -
```

(Drives' speed varies; you can get the dev numbers when you execute cdrecord -scanbus).
Note that 10g R2 won't fit on a single CD since it has over 780MB.

## Checking Memory and Swap Space
Oracle says that the system must have at least 512MB of RAM and 1GB of swap space or twice the size of RAM. And for systems with more than 2 GB of RAM, the swap space can be between one and two times the size of RAM. You might also want to check out <a href="http://www.puschitz.com/TuningLinuxForOracle.shtml#SizingSwapSpace">Sizing Swap Space</a>.
For test sake I tried to install an Oracle Database 10g (Type: General Purpose Database) on a little PC with 256MB of RAM and 1 GB of swap space. I was able to get a 10g database up and running on this little PC without a problem.
To check the size of physical memory, execute:
```bash
grep MemTotal /proc/meminfo
```
To check the size of swap space, execute:
```bash
grep SwapTotal /proc/meminfo
```
You also can add temporary swap space to your system by creating a temporary swap file instead of using a raw device. Here is the procedure:
```bash
su - root
dd if=/dev/zero of=tmpswap bs=1k count=900000
chmod 600 tmpswap
mkswap tmpswap
swapon tmpswap
```
To disable the temporary swap space execute the following commands:
```bash
su - root
swapoff tmpswap
rm tmpswap
```
## Checking /tmp Space
According to Oracle's documentation, the Oracle Universal Installer (OUI) requires up to 400 MB of free space in the <tt>/tmp</tt> directory. But OUI checks if <tt>/tmp</tt> is only greater than 80 MB.
To check the space in <tt>/tmp</tt>, run:
```bash
$ df /tmp
```
If you do not have enough space in the <tt>/tmp</tt> filesystem, you can temporarily create a <tt>tmp</tt> directory in another filesystem. Here is how you can do this:
```bash
su - root
mkdir /&lt;AnotherFilesystem&gt;/tmp
chown root.root /&lt;AnotherFilesystem&gt;/tmp
chmod 1777 /&lt;AnotherFilesystem&gt;/tmp
export TEMP=/&lt;AnotherFilesystem&gt;           # used by Oracle
export TMPDIR=/&lt;AnotherFilesystem&gt;         # used by Linux programs like the linker "ld"
```
When you are done with the Oracle installation, shutdown Oracle and remove the temporary <tt>/tmp</tt> directory:
```bash
su - root
rmdir /&lt;AnotherFilesystem&gt;/tmp
unset TEMP
unset TMPDIR
```

## Checking Software Packages (RPMs)
<strong>General</strong>
Before you install an Oracle Database 10g you need to check the system for required RPMs. On my systems I usually install a minimum list of RPMs which usually requires the installation of additional packages for Oracle databases. <em>Always ensure to use the latest RPMs and kernels!</em>
For <strong>10g R2 (32-bit) on RHEL 4 x86</strong>, the document <a href="http://download-east.oracle.com/docs/html/B15659_03/toc.htm">Oracle Database Release Notes 10g Release 2 (10.2) for Linux x86</a> lists the following required package versions or higher:
```bash
binutils-2.15.92.0.2-10.EL4
  compat-db-4.1.25-9
  control-center-2.8.0-12
  gcc-3.4.3-9.EL4
  gcc-c++-3.4.3-9.EL4
  glibc-2.3.4-2
  glibc-common-2.3.4-2
  gnome-libs-1.4.1.2.90-44.1
  libstdc++-3.4.3-9.EL4
  libstdc++-devel-3.4.3-9.EL4
  make-3.80-5
  pdksh-5.2.14-30
  sysstat-5.0.5-1
  xscreensaver-4.18-5.rhel4.2
```
Also ensure to install the <tt>libaio-0.3.96</tt> RPM or a newer version! Otherwise the OUI prerequisite check will fail.
To check the RPMs, run:
```bash
rpm -q binutils compat-db control-center gcc gcc-c++ glibc glibc-common gnome-libs \
         libstdc++ libstdc++-devel make pdksh sysstat xscreensaver libaio
```
<strong>10g R2 on RHEL AS 4 (x86)</strong>
On my <span style="text-decoration: underline;">RHEL AS 4 x86</span> system I had to install the following RPMs and dependencies to meet the software requirements:

```bash
rpm -Uvh gcc-3.4.4-2.i386.rpm \
            gcc-c++-3.4.4-2.i386.rpm \
            libstdc++-devel-3.4.4-2.i386.rpm \
            glibc-devel-2.3.4-2.13.i386.rpm \
            glibc-headers-2.3.4-2.13.i386.rpm \
            glibc-kernheaders-2.4-9.1.98.EL.i386.rpm

rpm -Uvh gnome-libs-1.4.1.2.90-44.1.i386.rpm \
            compat-db-4.1.25-9.i386.rpm \
            ORBit-0.5.17-14.i386.rpm \
            gtk+-1.2.10-33.i386.rpm \
            imlib-1.9.13-23.i386.rpm \
            libpng10-1.0.16-1.i386.rpm \
            gdk-pixbuf-0.22.0-16.el4.i386.rpm \
            libungif-4.1.3-1.i386.rpm \
            alsa-lib-1.0.6-5.RHEL4.i386.rpm \
            audiofile-0.2.6-1.i386.rpm \
            esound-0.2.35-2.i386.rpm

rpm -Uvh sysstat-5.0.5-1.i386.rpm

rpm -Uvh libaio-0.3.103-3.i386.rpm

rpm -Uvh xorg-x11-deprecated-libs-6.8.2-1.EL.13.20.i386.rpm

rpm -Uvh compat-libstdc++-33-3.2.3-47.3.i386.rpm
```

I don't know why the <tt>control-center</tt> RPM and the <tt>xscreensaver</tt> RPM are listed as requirements. On my system I did not install these RPMs since I'm against installing desktop stuff on servers. When I installed 10g R2 I did not experience any problems when these RPMs were missing. When you want to install <tt>control-center</tt> RPM and the <tt>xscreensaver</tt>, then have fun. The list can be very long with all the dependencies like <tt>gnome-desktop</tt>, <tt>cdrecord</tt> etc..

## Checking Kernel Parameters
To see all kernel parameters, execute:
```bash
su - root
sysctl -a
For Oracle10g, the following kernel parameters have to be set to values greater than or equal to the recommended values which can be changed in the <tt>proc</tt> filesystem:
```bash
shmmax  = 2147483648     (To verify, execute: cat /proc/sys/kernel/shmmax)
shmmni  = 4096           (To verify, execute: cat /proc/sys/kernel/shmmni)
shmall  = 2097152        (To verify, execute: cat /proc/sys/kernel/shmall)   (for 10g R1)
shmmin  = 1              (To verify, execute: ipcs -lm |grep "min seg size")
shmseg  = 10             (It‘s hardcoded in the kernel - the default is much higher)

semmsl  = 250            (To verify, execute: cat /proc/sys/kernel/sem | awk '{print $1}')
semmns  = 32000          (To verify, execute: cat /proc/sys/kernel/sem | awk '{print $2}')
semopm  = 100            (To verify, execute: cat /proc/sys/kernel/sem | awk '{print $3}')
semmni  = 128            (To verify, execute: cat /proc/sys/kernel/sem | awk '{print $4}')

file-max = 65536         (To verify, execute: cat /proc/sys/fs/file-max)

ip_local_port_range = 1024 65000
                         (To verify, execute: cat /proc/sys/net/ipv4/ip_local_port_range)
```
NOTE: Do not change the value of any kernel parameter on a system where it is already higher than listed as minimum requirement.

Oracle also recommends to set the local port range <tt>ip_local_port_range</tt> for outgoing messages to "1024 65000" which is needed for high-usage systems. This kernel parameter defines the local port range for TCP and UDP traffic to choose from.
I added the following lines to the <tt>/etc/sysctl.conf</tt> file which is used during the boot process:

```bash
kernel.shmmax=2147483648
kernel.sem=250 32000 100 128
fs.file-max=65536
net.ipv4.ip_local_port_range=1024 65000
```

Adding these lines to the <tt>/etc/sysctl.conf</tt> file will cause the system to change these kernel parameters after each boot using the <tt>/etc/rc.d/rc.sysinit</tt> script which is invoked by <tt>/etc/inittab</tt>. But in order that these new added lines or settings in <tt>/etc/sysctl.conf</tt> become effective immediately, execute the following command:

```bash
su - root
sysctl -p
```

## Sizing Disk Space for Oracle10g
Oracle says that about 2.5 GB of disk space should be reserved for the <span style="text-decoration: underline;">Oracle software</span> on Linux.
When I did an Oracle 10g Release 1 (10.1.0.3.0) "General Purpose Database" installation (not including any software from the Oracle Database 10g Companion CD), the <span style="text-decoration: underline;">Oracle software</span> used about 1.3 GB of disk space, and the preconfigured "General Purpose Database" (datafiles, etc.) used about 710 MB of disk space.
```bash
$ du -m -s /u01
1963    /u01
$ du -m -s /u01/app/oracle/oradata
720     /u01/app/oracle/oradata
```
If you also install additional software from the Oracle Database 10g Companion CD, then add at least 1 GB of free disk space.
So if you install Oracle10g Enterprise Edition and additional software from the Oracle Database 10g Companion CD, then you need about 2.5 GB of disk for the Oracle software. And if you also want to add a preconfigured database on the same filesystem, make sure to add another 1 GB of disk space.
NOTE: If you don't put Oracle10g on a separate filesystems, then make sure the root filesystem "<tt>/</tt>" has enough disk space. You can check the free space of the root filesystem with the following command:
```bash
df -h /
```

## Using Automatic Storage Management (ASM)
For more information on installing and configuring ASM, see <a href="http://www.puschitz.com/InstallingOracle10gRAC.shtml#InstallingAndConfiguringAutomaticStorageManagementAndDisks">Installing and Configuring Automatic Storage Management (ASM) and Disks</a>. And for information on how to make use of ASM disk groups when running OUI, see <a href="http://www.puschitz.com/InstallingOracle10gRAC.shtml#InstallingOracleDatabase10gWithRACDBCA">Installing Oracle Database 10g with Real Application Cluster (RAC)</a>.

## Creating Oracle User Accounts
To create the <tt>oracle</tt> account and groups, execute the following commands:
```bash
su - root
groupadd dba          # group of users to be granted SYSDBA system privilege
groupadd oinstall     # group owner of Oracle files
useradd -c "Oracle software owner" -g oinstall -G dba oracle
passwd oracle
```
For more information on the <tt>"oinstall"</tt> group account, see <a href="http://metalink.oracle.com/oracleinstall/oracle8i/genericunix.html#Uoui">When to use "OINSTALL" group during install of oracle</a>.

## Setting Shell Limits for the Oracle User
Most shells like Bash provide control over various resources like the maximum allowable number of open file descriptors or the maximum number of processes available to a user. For more information on <tt>ulimit</tt> for the Bash shell, see <tt>man bash</tt> and search for <tt>ulimit</tt>.
If you just install a small test database, then you might be ok with the current settings (note that the limits very often vary). But for (larger) production databases, you should increase the following shell limits to the following values recommended by Oracle:
```bash
nofile = 65536     (To verify, execute: ulimit -n)
nproc  = 16384     (To verify, execute: ulimit -u)
```
The <tt>nofile</tt> option denotes the maximum number of open file descriptors, and <tt>nproc</tt> denotes the maximum number of processes available to a single user.
To see all shell limits, execute:
```bash
ulimit -a
```
The following procedures/links show how to increase these parameters for the <tt>oracle</tt> user account:
For more information on <tt>nofile</tt> and how to increase the limit, see <a href="http://www.puschitz.com/TuningLinuxForOracle.shtml#SettingLimitsForTheMaximumNumberOfOpenFileDescriptorsForTheOracleUser">Setting Limits for the Maximum Number of Open File Descriptors for the Oracle User</a>. Even though this procedure was written for Oracle9i on RHAS 2.1, it also applies to Oracle10g on RHEL AS 2.1, RHEL AS 3, and other versions.
For more information on <tt>nproc</tt> and how to increase the limit, see <a href="http://www.puschitz.com/TuningLinuxForOracle.shtml#SettingLimitsForTheMaximumNumberOfProcessesForTheOracleUser">Setting Limits for the Maximum Number of Processes for the Oracle User</a>. Even though this procedure was written for Oracle9i on RHAS 2.1, it also applies to Oracle10g on RHEL AS 2.1, RHEL AS 3, and other versions.
<h4><span style="text-decoration: underline;">Creating Oracle Directories</span></h4>
For Oracle10g you only need to create the directory for <tt>$ORACLE_BASE</tt>:

```bash
su - root
mkdir -p /u01/app/oracle
chown oracle.oinstall /u01/app/oracle
```

But if you want to comply with Oracle's Optimal Flexible Architecture (OFA), then you don't want to place the database files in the <tt>/u01</tt> directory but in another directory/filesystem/disk like <tt>/u02</tt>. This is not a requirement but if you want to comply with OFA, then you might want to create the following directories as well:

```bash
su - root
mkdir -p /u02/oradata/<em>orcl</em>
chown oracle.oinstall /u02/oradata/orcl
```

In this example, "orcl" stands for the name of the database which will also be the name of the instance. This is typically the case for single instance databases.
<strong>Optimal Flexible Architecture (OFA) for 10g R1 (10.1.0.2)</strong>
The OFA standard is a guideline created by Oracle to ensure reliable Oracle installations. For Oracle 10g Database, the OFA recommended Oracle home path has changed.
The home path for the first 10g (10.1.0) database installation on a system would be:
```bash
/u01/app/oracle/product/10.1.0/<strong>db_1</strong>
```
If you would install a second Oracle 10g Database 10g (10.1.0) on the same system, the Oracle home directory would be as follows:
```bash
/u01/app/oracle/product/10.1.0/db_<strong>2</strong>
```
If the Oracle10g software is not owned by the user <tt>oracle</tt> but by the user "oraowner", then the path of the Oracle home directory would be:
```bash
/u01/app/<strong>oraowner</strong>/product/10.1.0/db_1
/u01/app/<strong>oraowner</strong>/product/10.1.0/db_2
```
The standard directory name for Oracle10g is "app":
```bash
/u01/<strong>app</strong>/oracle/product/10.1.0/db_1
```
Oracle recommends to use mount points such as <tt>/u01</tt>, <tt>/u02</tt>, etc. which complies with the OFA guidelines. But others can be used, for example:
```bash
/<strong>disk_1</strong>/app/oracle/product/10.1.0/db_1
```
The subtree for database files not stored in ASM disk groups should be named as follows:
```bash
<strong>/u02</strong>/oradata/&lt;<em>db_name_1</em>&gt;
<strong>/u02</strong>/oradata/&lt;<em>db_name_2</em>&gt;
<strong>/u03</strong>/oradata/&lt;<em>db_name_1</em>&gt;
<strong>/u03</strong>/oradata/&lt;<em>db_name_2</em>&gt;
```
The mount point <tt>/u01</tt> should be used for the Oracle software only. <tt>/u02</tt>, <tt>/u03</tt>, <tt>/u04</tt> etc. should be used for the database files. The <tt>db_name</tt> stands for the <tt>DB_NAME</tt> initialization parameter which is typically the same as the SID name for single instance databases.

## Setting Oracle Environments
Since the Oracle Universal Installer (OUI) "<tt>runInstaller</tt>" is run from the <tt>oracle</tt> account, some environment variables must be configured for this account before OUI is started.
Execute the following commands for the Bash shell which is the default shell on Red Hat Linux (to verify your shell run: <tt>echo $SHELL</tt>):
```bash
su - oracle
export ORACLE_BASE=/u01/app/oracle
export ORACLE_SID=orcl
```
<strong>NOTE</strong>: If <tt>ORACLE_BASE</tt> is used, then Oracle recommends that you don't set the <tt>ORACLE_HOME</tt> environment variable but that you choose the default path suggested by the OUI. You can set and use <tt>ORACLE_HOME</tt> after you finished running OUI.
Also, the environment variables <tt>ORACLE_HOME</tt> and <tt>TNS_ADMIN</tt> should not be set. If you've already set these environment variables, you can unset them by running the following commands:

```bash
unset ORACLE_HOME
unset TNS_ADMIN
```

To have these environment variables set automatically each time you login as <tt>oracle</tt>, you can add these environment variables to the <tt>~oracle/.bash_profile</tt> file which is the user startup file for the Bash shell on Red Hat Linux. To do this you could simply copy/paste the following commands to make these settings permanent for your <tt>oracle</tt>'s Bash shell:

```bash
su - oracle
cat &gt;&gt; ~oracle/.bash_profile &lt;&lt; EOF
export ORACLE_BASE=/u01/app/oracle
export ORACLE_SID=orcl
EOF
```

## Installing Oracle10g
<strong>Installing Oracle10g on a Remote Linux Server</strong>
If you don't install Oracle on your local system but on a remote server, then you need to relink X to your local desktop. The easiest way to do this is to use the "X11 forwarding" feature of ssh. This means that you don't have to run <tt>xhost</tt> and set the <tt>DISPLAY</tt> environment variable.
Here is an example how to make use of the "X11 forward" feature of ssh. Simply run the following command from your <span style="text-decoration: underline;">local desktop</span>:
```bash
$ ssh -X oracle@oracle_remote_server_name
```
Now when you try to run any GUI tool on the remote server, it will automatically be relinked to your local desktop. If this is not working, verify that the <tt>ForwardX11</tt> setting is not set to "<tt>no</tt>" in <tt>/etc/ssh/ssh_config</tt> on the remote server:
```bash
su - root
# grep ForwardX11 /etc/ssh/ssh_config | grep -v "^#"
        ForwardX11 yes
#
```

If you are using <tt>telnet</tt>, however, you will have to set <tt>DISPLAY</tt> manually, see article <a href="http://www.puschitz.com/InstallingOracle9i.shtml#StartingrunInstaller">Starting runInstaller</a> for more information.

<strong>Starting Oracle Universal Installer</strong>
Insert the Oracle CD that contains the image of the downloaded file <tt>ship.db.lnx32.cpio</tt>, or change to the directory that contains the image directory <tt>Disk1</tt>.
If you install Oracle10g from a CD, mount the CD by running the following commands in another terminal:
```bash
su - root
mount /media/cdrom
```
Before you execute <tt>runInstaller</tt>, make sure the Oracle environment variables are set, see <a href="http://www.puschitz.com/InstallingOracle10g.shtml#SettingOracleEnvironments">Setting Oracle Environments</a>. You can verify the settings by running the <tt>set</tt> command:
```bash
su - oracle
oracle$ set
```
To execute <tt>runInstaller</tt> from the mounted CD, run the following command as the <tt>oracle</tt> user:
```bash
oracle$ /media/cdrom/runInstaller
```
<strong>Using Oracle Universal Installer (OUI)</strong>
The following example shows how to install x86 Oracle 10g Release 1 Database Software and a "General Purpose" database:
(<em>Note, the screens and questions will look different if you install 10g R2 or 64-bit 10g R1 database</em>)

- Welcome Screen:
- Basic Installation:       Checked it which is the default
        - Oracle Home Location:     Use default: /u01/app/oracle/product/10.1.0/db_1
        - Installation Type:        I used the default: Enterprise Edition
        - UNIX DBA Group:           Use default: <strong>dba</strong>
        - Create Starter Databases: I checked it for this example which is the default
        - Global Database Name:     orcl
        - Database password:        password for SYS, SYSTEM, SYSMAN, and DBSNMP
- Advanced Installation:    For this article I did not check it
Click Next

- Specify Inventory directory and credentials:
        - Full path of the inventory directory: Use default: /u01/app/oracle/oraInventory
        - Specify Operating System group name:  Use default: oinstall
Click Next

- A window pops up to run the orainstRoot.sh script:
        Run the script in another terminal:
        ```bash
            su - root
            # /u01/app/oracle/oraInventory/orainstRoot.sh
            Creating the Oracle inventory pointer file (/etc/oraInst.loc)
            Changing groupname of /u01/app/oracle/oraInventory to oinstall.
            #
        ```
        Click Continue

- Product-specific Prerequisite Checks:
        Verify that all checks have been passed.
        <strong>Make sure that the status of each Check is set to "Succeeded".
        On RHEL AS 4 ignore the warnings for binutils, gcc, and openmotif and proceed.</strong>
        Note that the "Retry" button doesn't work after you fixed one of the failed checks.
Click Next

- Select Database Configuration:
        I selected "General Purpose".
Click Next

- Specify Database Configuration Options:
       - Global Database Name: I used "orcl".
       - SID: I used "orcl".
Click Next

- Select Database Management Option:
       I selected "Use Database Control for Database Management".
Click Next

- Specify Database File Storage Option: I selected "File System".
       - File System     - Specify Database file location: /u01/app/oracle/oradata/
                           If you want to comply with OFA, you should another  mount point
                           than '/u01', e.g. /u02/oradata.
Click Next

- Specify Backup and Recovery Options:
         For my test installation I selected "Do no enable Automated Backups".
Click Next

- Specify Database Schema Passwords:
<em>        Make sure that the password(s) don't start with a digit number! Otherwise you
        will later get error message(s) like "ORA-00988 missing or invalid password".</em>
Click Next

- Summary:  Click Install If Enterprise manager configuration fails due to port allocation problems, check out Oracle10g/Linux Errors and Problems. When a window pops up to run the root.sh script, execute the script in another terminal as root:

 ```bash
 su - root
 # /u01/app/oracle/product/10.1.0/db_1/root.sh
 Running Oracle10 root.sh script...
 ```
 following environment variables are set as:
 ```bash
 ORACLE_OWNER= oracle
 ORACLE_HOME=  /u01/app/oracle/product/10.1.0/db_1
 ```
 Enter the full pathname of the local bin directory: [/usr/local/bin]:
 ```bash
Copying dbhome to /usr/local/bin ...
Copying oraenv to /usr/local/bin ...
Copying coraenv to /usr/local/bin ...
Creating /etc/oratab file...
Adding entry to /etc/oratab file...
Entries will be added to the /etc/oratab file as needed by
Database Configuration Assistant when a database is created
Finished running generic part of root.sh script.
Now product-specific root actions will be performed.
/var/opt/oracle does not exist. Creating it now.
/etc/oracle does not exist. Creating it now.
Successfully accumulated necessary OCR keys.
Creating OCR keys for user 'root', privgrp 'root'..
Operation successful.
Oracle Cluster Registry for cluster has been initialized
Adding to inittab
Checking the status of Oracle init process...
Expecting the CRS daemons to be up within 600 seconds.
CSS is active on these nodes.
mars
CSS is active on all nodes.
Oracle CSS service is installed and running under init(1M)
```
Click OK
- End of Installation:  Click Exit

## Updates after Running Oracle Universal Installer
After Oracle10g has been installed, make sure that <tt>ORACLE_HOME</tt>, <tt>PATH</tt>, and <tt>LD_LIBRARY_PATH</tt> are set for the <tt>oracle</tt> account.
<em>Note that the path for <tt>ORACLE_HOME</tt> might be different on your system!</em>
<em>Also note that <tt>LD_LIBRARY_PATH</tt> is needed for some Oracle binaries such as </em><tt>sysresv</tt>!

For 10g R2 (10.2.0.1.0) I added the following lines to the <tt>~oracle/.bash_profile</tt> file:
```bash
export ORACLE_HOME=$ORACLE_BASE/oracle/product/10.2.0/db_1
export PATH=$PATH:$ORACLE_HOME/bin
export LD_LIBRARY_PATH=$ORACLE_HOME/lib
```

After that run the following command to set all environment variables in <tt>~oracle/.bash_profile</tt>:
```bash
$ . ~oracle/.bash_profile
```
This commmand will add the environment variables to the <tt>~oracle/.profile</tt> and source in the file for the current shell by executing "<tt>. ~oracle/.bash_profile</tt>".

## Oracle Post-installation Tasks
<strong>Startup and Shutdown of the Oracle10g Database</strong>
To startup the database:
```bash
oracle$ sqlplus /nolog
SQL&gt; connect / as sysdba
SQL&gt; startup
```bash
To shutdown the database:
```bash
oracle$ sqlplus /nolog
SQL&gt; connect / as sysdba
SQL&gt; shutdown
```

The slash connects you to the schema owned by SYS. In the above example you will be connected to the schema owned by SYS with the privilege SYSDBA. SYSDBA gives you the following privileges:
- sysoper privileges WITH ADMIN OPTION
- create database
- recover database until

<strong>Shutdown of other Oracle 10g Background Processes</strong>
If you installed a preconfigured database using OUI, then several Oracle background processes are now running on your server. Execute the following command to see the background processes:
```bash
ps -ef
```
To shutdown the Oracle background processes after an Oracle Database 10g installation, you can execute the following commands:
iSQL*Plus
To stop iSQL*Plus, run:
```bash
su - oracle
isqlplusctl stop
```

Database Management Processes

During the installation of Oracle 10g, OUI offered two Database Management Options:
If you selected "Database Control for Database Management", then the Oracle Enterprise Manager Database Control (Database Control) can be shutdown with the following command which stops both the agent and the Oracle Containers for Java (OC4J) management service:

```bash
su - oracle
emctl stop dbconsole
```
If you selected "Grid Control for Database Management" which is used for full "Grid Control" installations, then the Oracle Management Agent (standalone agent) for the Oracle Enterprise Manager Grid Control (Grid Control) can be stopped with the following command:

```bash
su - oracle
emctl stop agent
```

Oracle Net Listener
To stop the listener, run:
```bash
su - oracle
lsnrctl stop
```

To shutdown Oracle CSS daemon, run:
```bash
su - root
/etc/rc.d/init.d/init.cssd stop
```
## Tips and Hints for Oracle10g on Linux

To reinstall Oracle10g after a failed installation attempt, you might want to execute the following commands.
Make sure you first used the De-installation option in OUI.

```bash
su - root
export ORACLE_HOME=/u01/app/oracle/product/10.1.0/db_1
. $ORACLE_HOME/bin/localconfig delete    # stops the Oracle CSS daemon and deletes configuration

rm -rf /u01/app/oracle/*
rm -f /etc/oraInst.loc /etc/oratab
rm -rf /etc/oracle
rm -f /etc/inittab.cssd
rm -f /usr/local/bin/coraenv /usr/local/bin/dbhome /usr/local/bin/oraenv
```

Make also sure to <tt>unset</tt> and uncomment <tt>ORACLE_HOME</tt> from <tt>~oracle/.bash_profile</tt>.</ul>
Well that's about it. Have a great time working on it.</li>
